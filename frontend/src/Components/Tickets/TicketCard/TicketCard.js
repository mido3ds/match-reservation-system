import { Link } from "react-router-dom";
import Delete from "../../../images/delete.png";
import Price from "../../../images/money.png";
import Seat from "../../../images/seat-icon-gray.png";
import { logo_60x60 } from "../../../teams"
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import { NotificationManager } from 'react-notifications';
import { DefaultApi } from '../../../api';
import '../../Matches/MatchCard/MatchCard.css';
import './TicketCard.css';
import Moment from 'react-moment';
import 'moment-timezone';

const api = new DefaultApi();

function TicketCard({ card }) {
  const {removeCard, ...ticket} = card;

  let cancelTicket = async () => {
    try {
      const resp = await api.cancelTicket(authToken(), ticket.uuid);
      NotificationManager.success(resp.data?.msg);
      removeCard();
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) 
        NotificationManager.error(err.response.data.err);
    }
  }

  return (
      <div className='match-card-container'>
        <div className="ticket-card flex-container-row-hcenter">
          <img alt="delete-icon" className="cancel-ticket-icon" src={Delete} data-toggle="modal" data-target={'#cancelModal' + card.id}/>
          <ConfirmationModal id={'cancelModal' + card.id} 
                              text={ 'Are you sure you want to cancel this ticket?'}
                              onOK={ cancelTicket } /> : ''
          <Link className="noHover" to={{ pathname: `/match-reservation/${ticket.match.uuid}`, state: ticket.match }}>
            <div className='flex-container-row-hcenter'>
              <div className="upper-area flex-container-row-hcenter" >
                <div className="home-team" >
                  <img alt={ticket.match.homeTeam.name + '-logo'} src={logos_60x60[ticket.match.homeTeam.name]} />
                  <p> {ticket.match.homeTeam.name} </p>
                </div>
                <div className="date-time" >
                  <p className="time"> <Moment format="hh:mm" date={ticket.match.dateTime} />  </p>
                  <p className="date"> <Moment format="ll" date={ticket.match.dateTime} /> </p>
                </div>
                <div className="away-team" >
                  <img alt={ticket.match.awayTeam.name + '-logo'} src={logos_60x60[ticket.match.awayTeam.name]} />
                  <p> {ticket.match.awayTeam.name}  </p>
                </div>
              </div>
            </div>
            <div className="middle-area flex-container-column-vcenter" >
              <span className="stadium">
                <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
                <span> {ticket.match.venue} </span>
              </span>
              <div className="flex-container-row-vcenter">
                <span className="tickets-seat-number-area" >
                  <img alt="seat-icon" src={Seat} />
                  <span> {ticket.seatID} </span>
                </span>
                <span className="tickets-price-area" >
                  <img alt="price-icon" src={Price} />
                  <span> {ticket.price + "$"}  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default TicketCard;