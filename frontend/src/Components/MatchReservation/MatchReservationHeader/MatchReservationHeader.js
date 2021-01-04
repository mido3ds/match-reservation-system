import './MatchReservationHeader.css';
import UsersImage from "../../../images/match.png";
import Logo1 from "../../../images/teams_logos_120x120/9.png";
import Logo2 from "../../../images/teams_logos_120x120/10.png";

function MatchReservationHeader({match}) {
  return (
      <div class="match-reservation-header">
          <img className="match-reservation-header-image" alt="match-header" src={UsersImage}/>
          <div className="match-details flex-container-column-vcenter">
            <div className="teams-area flex-container-row-hcenter" > 
              <div className="match-home-team" > 
                <img alt="Logo" src={Logo1}/> 
                <p> Wadi Degla </p>
              </div>
              <div className="match-date-time flex-container-column"> 
                <p className="match-time"> 23:15  </p> 
                <p className="match-date"> 5 january 2021 </p> 
                <div className="stad-refere-area flex-container-row-hcenter">
                  <span className="match-stadium">
                    <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg"/>
                    <span> Burg El-Arab </span>
                  </span>
                  <span className="match-referee" >
                    <img alt="referee-icon" src="https://www.flaticon.com/svg/static/icons/svg/850/850989.svg"/>
                    <span> Gehad Grisha </span>
                  </span>
                </div>
                <div className="flex-container-row-hcenter">
                  <span className="first-linesman">
                    <img alt="linesman-icon" src="https://www.flaticon.com/svg/static/icons/svg/1031/1031387.svg"/>
                    <span> Ayman Dgesh </span>
                  </span>
                  <span className="second-linesman" >
                    <img alt="linesman-icon" src="https://www.flaticon.com/svg/static/icons/svg/1031/1031387.svg"/>
                    <span> Abo El-regal </span>
                  </span>
                </div>
              </div>
              <div className="match-away-team" > 
                <img alt="Logo" src={Logo2}/>
                <p> El-Zamalek  </p> 
              </div>
            </div>
          </div>
      </div>
  );
}

export default MatchReservationHeader;