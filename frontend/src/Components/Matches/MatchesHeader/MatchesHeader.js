import Ball from "../../../images/ball.jpg";
import MatchForm from '../MatchForm/MatchForm';
import './MatchesHeader.css';

function MatchesHeader() {
  return (
    <div class="matches-header">
      <img className="matches-header-image" alt="matches-header" src={Ball} />
      <div className="matches-text-block">
        <h1> Matches </h1>
      </div>
      <div className="matches-button-area">
        <button type="button" className="matches-add-button btn btn-primary"
          data-toggle="modal" data-target="#MatchFormModal"> Add </button>
      </div>
      <MatchForm title="Add Match" />
    </div>
  );
}

export default MatchesHeader;