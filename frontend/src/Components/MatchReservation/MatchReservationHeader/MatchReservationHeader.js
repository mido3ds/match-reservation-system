import { logos_120x120 } from "../../../teams"
import './MatchReservationHeader.css';
import Moment from 'react-moment';
import 'moment-timezone';


function MatchReservationHeader({ match }) {
  return (
    <div className="match-details">
      <div className="teams-area flex-container-row-vcenter-hcenter" >
        <div className="match-home-team" >
          <img alt="Logo" src={logos_120x120[match.homeTeam]} />
          <p> { match.homeTeam } </p>
        </div>
        <div className="match-date-time flex-container-column-vcenter-hcenter">
          <p className="match-time"> <Moment format="hh:mm" date={match.dateTime} /> </p>
          <p className="match-date"> <Moment format="ll" date={match.dateTime} /> </p>
          <div className="stad-refere-area flex-container-row-hcenter">
            <span className="match-stadium">
              <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
              <span> { match.venue }  </span>
            </span>
            <span className="match-referee" >
              <img alt="referee-icon" src="https://www.flaticon.com/svg/static/icons/svg/850/850989.svg" />
              <span> { match.mainReferee }  </span>
            </span>
          </div>
          <div className="flex-container-row-hcenter">
            <span className="first-linesman">
              <img alt="linesman-icon" src="https://www.flaticon.com/svg/static/icons/svg/1031/1031387.svg" />
              <span> { match.firstLinesman }  </span>
            </span>
            <span className="second-linesman" >
              <img alt="linesman-icon" src="https://www.flaticon.com/svg/static/icons/svg/1031/1031387.svg" />
              <span> { match.secondLinesman }  </span>
            </span>
          </div>
        </div>
        <div className="match-away-team" >
          <img alt="Logo" src={logos_120x120[match.awayTeam]} />
          <p> { match.awayTeam }   </p>
        </div>
      </div>
    </div>
  );
}

export default MatchReservationHeader;