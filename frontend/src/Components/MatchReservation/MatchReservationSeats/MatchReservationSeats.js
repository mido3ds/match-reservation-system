import React from 'react'
import Pitch from "../../../images/pitch.png";
import Ticket from "../../../images/ticket.png";
import Seat from "../../../images/seat-icon-gray.png";
import Price from "../../../images/money.png";
import SeatPicker from 'react-seat-picker'
import { DefaultApi } from '../../../api';
import TicketsForm from '../TicketsForm/TicketsForm'
import "./MatchReservationSeats.css";
import { useEffect, useState } from "react";
import { authToken } from '../../../Auth';
import Delete from "../../../images/delete2.png";
import { NotificationManager } from 'react-notifications';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';



const api = new DefaultApi();

function MatchReservationSeats({match}) {
  const [userTickets, setUserTickets] = useState([]);
  const [matchSeatMap, setMatchSeatMap] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  let getUserTickets = async () => {
    try {
      const resp = await api.getMatchTickets(authToken(), match.uuid);
      setUserTickets(resp.data.map((userTicket, i) => { 
        userTicket.id = i;
        userTicket.isReserved = true;
        userTicket.cancelTicket = () => { cancelTicket(userTicket); }
        return userTicket; 
      }));
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  let getMatchSeatMap = async () => {
    try {
      const resp = await api.getSeats(match.uuid, authToken())
      resp.data.forEach(row => { 
        row.forEach((seat, j) => seat.number = j )
      })
      setMatchSeatMap(resp.data)
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) 
        NotificationManager.error(err.response.data.err);
    }
  };

  useEffect(() => {
    getUserTickets();
    getMatchSeatMap();
    // eslint-disable-next-line
  }, []);


  let cancelTicket = async (ticket) => {
      try {
        const resp = await api.cancelTicket(ticket.uuid, authToken());
        NotificationManager.success(resp.data?.msg);
        setUserTickets(userTickets => {
          return userTickets.filter(userTicket => { return userTicket.id !== ticket.id })
        });
      } catch(err) {
        console.error(err.message);
        if (err.response?.data?.err) 
          NotificationManager.error(err.response.data.err);
      }
  }
  
  let reserveSeats = async (creditCard) => { 
    await Promise.all(userTickets.map(async(ticket, index) => {
      try {
        if(!ticket.isReserved) {
          const resp = await api.reserveSeat(match.uuid, ticket.seatID, authToken(), creditCard);
          NotificationManager.success(resp.data?.msg);
          userTickets[index].isReserved = true;
        } 
      } catch(err) {
          console.error(err.message);
          if (err.response?.data?.err) 
            NotificationManager.error(err.response.data.err);
      }
    }));
  }

  let updatePrice = () => {
    let totalPrice = 0;
    let showButton = false;
      for(var i = 0; i < userTickets.length; ++i) {
        if(userTickets[i] && !userTickets[i].isReserved) {
          totalPrice += userTickets[i].price;
          showButton = true;
        }
      }
    setTotalPrice(totalPrice);
    setShowButton(showButton);
  } 

  useEffect(() => {
    updatePrice()
    // eslint-disable-next-line
  }, [userTickets]);
  
  let addSeat = async ({ row, number, id }, addCb) => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      addCb(row, number, id, '')
      const lastTicketId =  userTickets.length ? userTickets[userTickets.length - 1].id : 0;
      let newTicket = { id: lastTicketId + 1, 
                        isReserved: false, 
                        seatID: id, 
                        price: match.ticketPrice,
                        cancelTicket: () => { cancelTicket(newTicket); }}
      setUserTickets([...userTickets , newTicket]);
      console.log("here")  
  }
 
  let removeSeat = async  ({ row, number, id }, removeCb) => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      removeCb(row, number, '')
      setUserTickets(userTickets => {
        return userTickets.filter(userTicket => { return userTicket.seatID !== id })
      });
  }

  const columnNumbers = [];
  for (var i = 1; i <= 10; i++) {
    columnNumbers.push(<div key={i.toString()} className="column-number-area">
                          <h3> {i} </h3>
                        </div>);
  }

  return (
    <div className="flex-container-row-hcenter">
      {matchSeatMap.length ? 
      <div className="reservation-area flex-container-column-vcenter">
        <div className="column-numbers flex-container-row">
          {columnNumbers}
        </div> 
        <div className = "seats-area">
          <SeatPicker 
            addSeatCallback={addSeat}
            removeSeatCallback={removeSeat}
            rows={matchSeatMap} 
            maxReservableSeats={10}
            alpha
            visible
            selectedByDefault
            tooltipProps={{multiline: true}}
            continuous
          /> 
        </div>
        <img className="pitch-image" alt="pitch" src={Pitch} />
      </div>
    : ''}
    {userTickets.length ?
      <div className="tickets-area flex-container-column-hcenter">
       <h2 className="tickets-title"> Tickets: </h2>
         <div className="flex-container-row-vcenter">
           {userTickets.map(ticket => (
            <div key={ticket.id.toString()} className={`ticket-area flex-container-column-hcenter ${ticket.isReserved ? "dark-red" : "light-green"}`}>
              {ticket.isReserved ? 
              <img alt="reject-icon" className="cancel-ticket" data-toggle="modal" data-target={'#cancelTicket' + ticket.id}  src={Delete}/>
              :''}
              <ConfirmationModal id={'cancelTicket' + ticket.id} 
                                text={ 'Are you sure you want to cancel this ticket?'}
                                onOK={ ticket.cancelTicket } />
              <img className="ticket-image" alt="pitch" src={Ticket}/>
              <div className="flex-container-row-hcenter">
                <div className="seat-number-area"> 
                  <img alt="pitch" src={Seat}/>
                  <span> {ticket.seatID} </span>
                </div>
                <div className="price-area">
                  <img alt="pitch" src={Price}/>
                  <span> {ticket.price} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        { showButton ? 
        <span> 
          <button type="button" className="tickets-purchase-button btn btn-primary"
                  data-toggle="modal" data-target="#TicketsModal"> Purchase </button> 
          <TicketsForm onSubmit={reserveSeats} totalPrice={totalPrice}/>
        </span>
        :''}
      </div> : ''}
  </div>
  );
}
export default MatchReservationSeats;