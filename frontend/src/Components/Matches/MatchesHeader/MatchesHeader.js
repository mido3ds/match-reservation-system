import Ball from "../../../images/ball.jpg";
import { authToken, isLoggedIn, userType } from '../../../Auth';
import { DefaultApi } from '../../../api';
import { NotificationManager } from 'react-notifications';
import './MatchesHeader.css';

const api = new DefaultApi();

function MatchesHeader({ showAddMatchModal }) {
  return (
    <div className="matches-header">
      <img className="matches-header-image" alt="matches-header" src={Ball} />
      <div className="matches-text-block">
        <h1> Matches </h1>
      </div>
      {
        isLoggedIn() && userType() === 'manager' ?
          <div className="matches-button-area">
            <button type="button" className="matches-add-button btn btn-primary" onClick={showAddMatchModal}> Add </button>
          </div> 
          : <div />
      }
    </div>
  );
}

export default MatchesHeader;