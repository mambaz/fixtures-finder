import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { splitDateTime } from './helper';
import CalendarPage from './CalendarPage';
import { useFixtureStatus } from "./FixtureStatusContext";
import FixtureComponent from "./components/fixtureComponent";
import CalendarIcon from "./calendar.svg"; 

const FixturesListingPage: React.FC = () => {
  // const { fixturesStatus, setFixtureStatus } = useFixtureStatus();
  const [fixtures, setFixtures] = useState<any[]>([]);
  const { setFixtureStatus } = useFixtureStatus();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev); // Toggle the state
  };

  return (
    <div className='main-container'>
      <section className='main-header'>
        <h1>Fixtures Listing</h1>
        <div className='main-header-cal'>
          <img width={'30'} src={CalendarIcon} alt="Calendar"onClick={toggleCalendar} />
          {/* {isCalendarVisible && <CalendarPage />} */}
          {isCalendarVisible && (
            <div className="overlay">
              <div className="overlay-content">
                <CalendarPage />
                <button onClick={toggleCalendar}>Close Calendar</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <ul>
        {fixtures.map((data: any) => (
          <li key={data.fixture.id}>
            <FixtureComponent data={data} />
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FixturesListingPage;
