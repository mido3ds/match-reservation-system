import React from 'react'
import Pitch from "../../../images/pitch.png";
import Ticket from "../../../images/ticket.png";
import Seat from "../../../images/seat-icon-gray.png";
import Price from "../../../images/money.png";
import SeatPicker from 'react-seat-picker'
import { DefaultApi } from '../../api';
import TicketsForm from '../TicketsForm/TicketsForm'
import "./MatchReservationSeats.css";
import { useEffect, useState } from "react";
import { authToken } from '../../../Auth';
import Delete from "../../../images/delete.png";
import Cancel from "../../../images/cancel.svg";

const api = new DefaultApi();

function MatchReservationSeats({match, seatMap}) {
  const [userTickets, setUserTickets] = useState();
  const [matchSeatMap, setMatchSeatMap] = useState();

  let getUserTickets = async () => {
    try {
      const resp = await api.getMatchTickets(authToken, match.uuid);
      setUserTickets(resp.data.map((userTicket, i) => { 
        userTicket.id = i;
        userTicket.isReserved = true;
        return userTicket; 
      }));
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  let getMatchSeatMap = async () => {
    try {
      const resp = await api.getSeats(matchID, authToken())
      setMatchSeatMap(resp.data);
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) 
        NotificationManager.error(err.response.data.err);
    }
  };

  useEffect(async () => {
    getUserTickets();
    getMatchSeatMap();
  }, []);
  
  let cancelTicket = (ticket) => {
    if(ticket.isReserved) {
      try {
        const resp = await api.cancelTicket(authToken(), ticket.uuid);
        NotificationManager.success(resp.data?.msg);
      } catch(err) {
        NotificationManager.error(err.message);
        if (err.response?.data?.err) 
          NotificationManager.error(err.response.data.err);
      }
    }
    removeSeat()  
  }
  
  let reserveSeat = () => {
    userTickets.forEach((ticket, index) => {
      try {
        if(!ticket.isReserved) {
          const resp = await api.reserveSeat(match.uuid, ticket.seatID, authToken());
          NotificationManager.success(resp.data?.msg);
          userTickets[index].isReserved = true;
        } 
      } catch(err) {
          NotificationManager.error(err.message);
          if (err.response?.data?.err) 
            NotificationManager.error(err.response.data.err);
      }
    });
  }

  let addSeat = async ({ row, number, id }, addCb) => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      addCb(row, number, id, '')
      lastTicketId =  userTickets[userTickets.length - 1];
      userTickets.push({id:lastTicketId + 1, 
                        isReserved: false, 
                        seatID: id, 
                        price: match.price })
  }
 
  let removeSeat = async  ({ row, number, id }, removeCb) => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      removeCb(row, number, '')
      setUserTickets(userTickets => {
        return userTickets.filter(userTicket => { return userTicket.id !== ticket.id })
      });
  }


  const columnNumbers = [];
  for (var i = 1; i <= 10; i++) {
    columnNumbers.push(<div key={i.toString()} className="column-number-area">
                          <h3> {i} </h3>
                        </div>);
  }

  const rows = [
    [{id: "A1"}, {id: "A2", number:2}, {id: "A3", number:3, isReserved: true}, {id: 4, number:4}, {id: 5, number:5}, {id: 6, number:6}, {id: 7, number:7}, {id: 8, number:8}, {id: 9, number:9}, {id: 10, number:10}],
    [{id: 11, number:1, isReserved: true}, {id: 12, number:2, isReserved: true}, {id: 13, number:3, isReserved: true}, {id: 14, number:4}, {id: 15, number:5}, {id: 16, number:6}, {id: 17, number:7}, {id: 18, number:8}, {id: 19, number:9}, {id: 20, number:10}],
    [{id: 21, number:1}, {id: 22, number:2}, {id: 23, number:3, isReserved: true}, {id: 24, number:4}, {id: 25, number:5}, {id: 26, number:6}, {id: 27, number:7}, {id: 28, number:8}, {id: 29, number:9}, {id: 30, number:10}]
  ]

  return (
    <div className="flex-container-row-hcenter">
      <div className="reservation-area flex-container-column-vcenter">
      <div className="column-numbers flex-container-row">
          {columnNumbers}
        </div> 
      <div className = "seats-area">
          <SeatPicker 
            addSeatCallback={addSeat}
            removeSeatCallback={removeSeat}
            rows={rows} /*seatMap*/
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
      <div className="tickets-area flex-container-column-hcenter">
        <h2 className="tickets-title"> Tickets: </h2>
        <div className="flex-container-row-vcenter">
          {userTickets.map(ticket => (
            <div key={ticket.id.toString()} className={`ticket-area flex-container-column-hcenter ${ticket.isReserved ? "dark-red" : "light-green"}`}>
              <img alt="reject-icon" className="cancel-ticket" src={ticket.isReserved ? Delete : Cancel}/>
              <ConfirmationModal id={'cancelTicket' + ticket.id} 
                                text={ 'Are you sure you want to cancel this ticket?'}
                                onOK={ cancelTicket(ticket) } /> : ''
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
        <TicketsForm />
        <button type="button" className="tickets-purchase-button btn btn-primary"
                data-toggle="modal" data-target="#TicketsModal"> Purchase </button> 
      </div>
  </div>
  );
}
export default MatchReservationSeats;