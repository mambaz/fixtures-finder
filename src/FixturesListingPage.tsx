import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { splitDateTime } from './helper';

const FixturesListingPage: React.FC = () => {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [fixtureStatus, setFixtureStatus] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadFixtures = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fixtures?page=${page}`);
      setFixtures((prevFixtures) => [...prevFixtures, ...response.data.fixtures]);
      setPage((prevPage) => (response.data.nextPage !== null ? response.data.nextPage : prevPage));
      
    } catch (error) {
      console.error('Error fetching fixtures:', error);
    }
    setLoading(false);
  };

  const loadStatus = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fixtures/status`);
    setFixtureStatus(response.data)
  };

  useEffect(() => {
    loadStatus();
    loadFixtures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        loadFixtures();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className='main-container'>
      <h1>Fixtures Listing</h1>
      <ul>
        {fixtures.map((data: any) => (
          <li key={data.fixture.id}>
            <div className='container'>
              <div className="match">
                <div className="match-header">
                  <div className={fixtureStatus[data.fixture.status.short].type === 'In Play' ? 'match-status-success' : 'match-status'}>
                    {fixtureStatus[data.fixture.status.short].type}</div>
                  <div className="match-tournament">
                    {/* CDN URL return 429 - Too many request
                      <img src={data.league.logo} alt="League Logo" /> 
                    */}
                    <img src="https://assets.codepen.io/285131/pl-logo.svg" alt="League Logo" />
                      {data.league.name}
                    </div>
                </div>
                <div className="match-content">
                  <div className="column">
                    <div className="team team--home">
                      <div className="team-logo">
                        <img src={data.teams.home.logo} alt="Home Team Icon" />
                      </div>
                      <h2 className="team-name">{data.teams.home.name}</h2>
                    </div>
                  </div>
                  <div className="column">
                    <div className="match-details">
                      <div className="match-date">
                        {splitDateTime(data.fixture.matchDate).date} at <strong>{splitDateTime(data.fixture.matchDate).time}</strong>
                      </div>
                      <div className="match-score">
                        <span className="match-score-number">{data.goals.home}</span>
                        <span className="match-score-divider">:</span>
                        <span className="match-score-number">{data.goals.away}</span>
                      </div>
                      <div className="match-time-lapsed">
                      {data.fixture.status.elapsed}'
                      </div>
                      <div className="match-referee">
                        Referee: <strong>{data.fixture.referee}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="team team--away">
                      <div className="team-logo">
                        <img src={data.teams.away.logo} alt="Away Team Icon" />
                      </div>
                      <h2 className="team-name">{data.teams.away.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Display other fixture details */}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FixturesListingPage;
