import { Link } from "react-router-dom";
import Delete from "../../../images/delete.png";
import Price from "../../../images/money.png";
import Seat from "../../../images/seat-icon-gray.png";
import Logo1 from "../../../images/teams_logos_60x60/15.png";
import Logo2 from "../../../images/teams_logos_60x60/07.png";
import '../../Matches/MatchCard/MatchCard.css';
import './TicketCard.css';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';

function TicketCard({ card }) {

  let cancelTicket = async () => {
    console.log("Cancel Ticket")
  }

  return (
      <div className='match-card-container'>
        <div className="ticket-card flex-container-row-hcenter">
          <img alt="delete-icon" className="cancel-ticket-icon" src={Delete} data-toggle="modal" data-target={'#cancelModal' + card.id}/>
          <ConfirmationModal id={'cancelModal' + card.id} 
                              text={ 'Are you sure you want to cancel this ticket?'}
                              onOK={ cancelTicket } /> : ''
          <Link className="noHover" to={{ pathname: `/match-reservation/${card.id}`, state: { card } }}>
            <div className='flex-container-row-hcenter'>
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
            </div>
            <div className="middle-area flex-container-column-vcenter" >
              <span className="stadium">
                <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
                <span> Burg El-Arab </span>
              </span>
              <div className="flex-container-row-vcenter">
                <span className="tickets-seat-number-area" >
                  <img alt="seat-icon" src={Seat} />
                  <span> A18 </span>
                </span>
                <span className="tickets-price-area" >
                  <img alt="price-icon" src={Price} />
                  <span> 55$ </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default TicketCard;