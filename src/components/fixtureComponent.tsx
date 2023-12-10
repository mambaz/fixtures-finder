import React from "react";
import { splitDateTime } from '../helper';
import { useFixtureStatus } from "../FixtureStatusContext";

interface ModalProps {
  // handleClose: () => void;
  // fixtureStatus: any[]; // Add fixtures prop
  data?: any;
//   data: {
//     fixture: {
//         status: {
//             short: string;
//             type: string;
//         }
//     }
//   }
}

export const FixtureComponent: React.FC<ModalProps> = ({ data }) => {
  const { fixtureStatus } = useFixtureStatus();
    return (
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
    );
  };

export default FixtureComponent;
