import { Link } from "react-router-dom";
import Delete from "../../../images/delete.png";
import Edit from "../../../images/edit.png";
import Logo1 from "../../../images/teams_logos_60x60/15.png";
import Logo2 from "../../../images/teams_logos_60x60/7.png";
import './MatchCard.css';

function MatchCard({ card }) {
  return (
    <Link className="noHover" to={{ pathname: `/match-reservation/${card.id}`, state: { card } }}>
      <div className='match-card-container'>
        <div className="match-card flex-container-row-hcenter">
          <img alt="edit-icon" className="edit" src={Edit} />
          <img alt="delete-icon" className="delete" src={Delete} />
          <div className="upper-area flex-container-row-hcenter" >
            <div className="home-team" >
              <img alt="Logo" src={Logo1} />
              <p> Wadi Degla </p>
            </div>
            <div className="date-time" >
              <p className="time"> 23:15  </p>
              <p className="date"> 5 jan 2021 </p>
            </div>
            <div className="away-team" >
              <img alt="Logo" src={Logo2} />
              <p> Wadi Degla  </p>
            </div>
          </div>
          <div className="middle-area flex-container-column-hcenter" >
            <span className="stadium">
              <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
              <span> Burg El-Arab </span>
            </span>
            <span className="referee" >
              <img alt="referee-icon" src="https://www.flaticon.com/svg/static/icons/svg/850/850989.svg" />
              <span> Gehad Grisha </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MatchCard;