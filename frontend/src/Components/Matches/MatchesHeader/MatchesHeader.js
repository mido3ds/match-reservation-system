import Ball from "../../../images/ball.jpg";
import { isLoggedIn, userType } from '../../../Auth';
import MatchForm from '../MatchForm/MatchForm';
import './MatchesHeader.css';

function AddMatches() {
  return (
    <div>
      <div className="matches-button-area">
        <button type="button" className="matches-add-button btn btn-primary"
          data-toggle="modal" data-target="#AddMatchFormModal"> Add </button>
      </div>
      <MatchForm title="Add Match" onSubmit={()=>{console.log("Yousryyyy")}} id="AddMatchFormModal" />
    </div>
  );
}

function MatchesHeader() {
  return (
    <div className="matches-header">
      <img className="matches-header-image" alt="matches-header" src={Ball} />
      <div className="matches-text-block">
        <h1> Matches </h1>
      </div>
      {
        isLoggedIn() && userType() === 'manager' ?
          <AddMatches /> : <div />
      }
    </div>
  );
}

export default MatchesHeader;