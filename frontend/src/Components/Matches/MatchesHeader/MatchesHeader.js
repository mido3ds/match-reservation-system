import './MatchesHeader.css';
import Ball from "../../../images/ball.jpg";

function MatchesHeader() {

  return (
      <div class="matches-header">
          <img className="matches-header-image" alt="matches-header" src={Ball}/>
          <div className="text-block">
            <h1> Matches </h1>
          </div>
          <div  className="matches-button-area">
            <button type="button" className="add-button btn btn-primary"> Add </button>
          </div>
      </div>
  );

}

export default MatchesHeader;