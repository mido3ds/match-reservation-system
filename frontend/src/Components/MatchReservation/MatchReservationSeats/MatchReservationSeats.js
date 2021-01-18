import React from 'react'
import Pitch from "../../../images/pitch.png";
import Ticket from "../../../images/ticket.png";
import Seat from "../../../images/seat-icon.png";
import Price from "../../../images/money.png";
import SeatPicker from 'react-seat-picker'
import { DefaultApi } from '../../../api';
import TicketsForm from '../TicketsForm/TicketsForm'
import "./MatchReservationSeats.css";
import { useEffect, useState } from "react";
import { authToken } from '../../../Auth';
import Delete from "../../../images/delete2.png";
import { NotificationManager } from 'react-notifications';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import { logout } from '../../../Auth';

const api = new DefaultApi();

function MatchReservationSeats({ match, sessionUUID, loggedIn, setLoggedIn }) {
  const [ userTickets, setUserTickets ] = useState([]);
  const [ seatMap, setSeatMap ] = useState([]);
  const [ showButton, setShowButton ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ confirmedTicket, setConfirmedTicket ] = useState();
  const [ loading, setLoading ] = useState(false);

  let getUserTickets = async () => {
    try {
      const resp = await api.getMatchTickets(authToken(), match.uuid);
      await setTimeout(500);
      setUserTickets(resp.data.map((userTicket, i) => {
        userTicket.id = i;
        userTicket.isReserved = true;
        userTicket.cancelTicket = () => { cancelTicket(userTicket); }
        return userTicket;
      }));
    } catch (err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err?.response?.data?.noUser) {
        logout();
        setLoggedIn(false);
        NotificationManager.error('Session ended, please login again');
      }
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  let getSeatMap = async () => {
    try {
      const resp = await api.getSeats(match.uuid)
      await setTimeout(500);
      resp.data.forEach(row => {
        row.forEach((seat, j) => {
          seat.number = j + 1;
          seat.isSelected = false;
        })
      });
      setSeatMap(resp.data)
    } catch (err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  let oldMatch = () => {
    let today = new Date();
    let matchDate = new Date(match.dateTime)
    return today > matchDate;
  }

  useEffect(() => {
    if (loggedIn) { getUserTickets(); }
    getSeatMap();
    return () => setEvents(events => events?.close());
    // eslint-disable-next-line
  }, []);

  const liveUpdatesEndpoint = `http://localhost:3000/api/matches/${match.uuid}/seats/live-updates?uuid=${sessionUUID}`;
  const [ listening, setListening ] = useState(false);
  // eslint-disable-next-line
  const [ events, setEvents ] = useState();

  let closeModal = (seatID, isReserved) => {
    if(isReserved) {
      setUserTickets(userTickets => {
        userTickets.forEach(ticket => {
          if(!ticket.isReserved && ticket.seatID === seatID) {
            window.$("#TicketsModal").modal('hide');
          }
        })
        return userTickets;
      });
    }
  }

  useEffect( () => {
    if (!listening) {
      const events = new EventSource(liveUpdatesEndpoint);
      events.addEventListener('message', (message) => {
        console.log(message);
        let { seatID, isReserved } = JSON.parse(message.data);
        setLoading(true);
        updateSeatMap(seatID, isReserved);
        closeModal(seatID, isReserved);
        setUserTickets(userTickets => {
          return userTickets.filter(userTicket => { return userTicket.seatID !== seatID })
        });
        setLoading(false);
        NotificationManager.info(`Seat ${seatID} is now ${isReserved ? 'reserved' : 'open' }!`);
      });
      setEvents(events);
      setListening(true);
    }
    // eslint-disable-next-line
  }, [listening]);

  let updateSeatMap = (seatID, isReserved) => {
    setSeatMap(seatMaps => {
      const row = seatID.charCodeAt(0) - 'A'.charCodeAt(0);
      const column = seatID.substring(1) - 1;
      seatMaps[row][column].isReserved = isReserved;
      seatMaps[row][column].isSelected = false;
      return seatMaps;
    })
  }

  let cancelTicket = async (ticket) => {
    setLoading(true)
    try {
      await api.cancelTicket(ticket.uuid, authToken());
      await setTimeout(500);
      updateSeatMap(ticket.seatID, false)
      setUserTickets(userTickets => {
        return userTickets.filter(userTicket => { return userTicket.id !== ticket.id })
      });
    } catch (err) {
      console.error(err.message);
      if (err?.response?.data?.noUser) {
        logout();
        setLoggedIn(false);
        NotificationManager.error('Session ended, please login again');
      }
      if (err.response?.data?.err)
        NotificationManager.error(err.response.data.err);
    }
    setLoading(false)
    window.$(`.seat-picker__row__number:contains('${ticket.seatID[0]}')`)
          .siblings(`:contains(${ticket.seatID.substring(1)})`)
          .first()
          .click();
  }

  let reserveSeats = async (creditCard) => {
    let failedRequest = false;
    setLoading(true)
    await Promise.all(userTickets.map(async (ticket, index) => {
      try {
        if (!ticket.isReserved) {
          await api.reserveSeat(match.uuid, ticket.seatID, authToken(), creditCard);
          updateSeatMap(ticket.seatID, true)
          getUserTickets();
        }
      } catch(err) {
        failedRequest = true;
        console.error(err.message);
        if (!err.response && err.request) NotificationManager.error('Connection error');
        else if (err?.response?.data?.noUser) {
          logout();
          setLoggedIn(false);
          NotificationManager.error('Session ended, please login again');
        }
        else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
      }
    }));
    if (!failedRequest)
      window.$("#TicketsModal").modal('hide');
    setLoading(false)
  }

  let updateState = () => {
    let totalPrice = 0;
    let showButton = false;
    for (var i = 0; i < userTickets.length; ++i) {
      if (userTickets[i] && !userTickets[i].isReserved) {
        totalPrice += userTickets[i].price;
        showButton = true;
      }
    }
    setTotalPrice(totalPrice);
    setShowButton(showButton);
  }

  useEffect(() => {
    updateState()
    // eslint-disable-next-line
  }, [userTickets]);

  let addSeat = async ({ row, number, id }, addCb) => {
    if (!loggedIn) {
      NotificationManager.warning('You need to login first to reserve seats.');
      return;
    }
    setLoading(true)
    addCb(row, number, id, '')
    const lastTicketId = userTickets.length ? userTickets[userTickets.length - 1].id : 0;
    let newTicket = {
      id: lastTicketId + 1,
      isReserved: false,
      seatID: id,
      price: match.ticketPrice,
    }
    newTicket.cancelTicket = () => { cancelTicket(newTicket); }
    setUserTickets([...userTickets, newTicket]);
    setLoading(false)
  }

  let removeSeat = async ({ row, number, id }, removeCb) => {
    setLoading(true)
    removeCb(row, number, '')
    setUserTickets(userTickets => {
      return userTickets.filter(userTicket => { return userTicket.seatID !== id })
    });
    setLoading(false)
  }

  return (
    <>
    <TicketsForm onSubmit={reserveSeats} totalPrice={totalPrice} />
    {confirmedTicket ? 
    <ConfirmationModal id={'cancelTicket' + confirmedTicket.id}
                  text={'Are you sure you want to cancel this ticket?'}
                  onOK={confirmedTicket.cancelTicket} /> : ''}
    <div className="reservation-container flex-container-row-hcenter">
      {seatMap.length && !oldMatch() ?
        <div className="reservation-area flex-container-column-vcenter">
          <div className="column-numbers flex-container-row">
            {seatMap[0].map((_, i) => { 
                return (
                <div key={(i+1).toString()} className="column-number-area">
                  <h3> {i + 1} </h3>
                </div>)
              })
            }
          </div>
          <div className="seats-area">
            <SeatPicker
              addSeatCallback={addSeat}
              removeSeatCallback={removeSeat}
              rows={seatMap}
              maxReservableSeats={seatMap.length * seatMap[0].length}
              loading={loading}
              alpha
              visible
              selectedByDefault
              tooltipProps={{ multiline: true }}
              continuous
            />
          </div>
          <img className="pitch-image" alt="pitch" src={Pitch} />
        </div>
        : ''}
      {userTickets.length ?
        <div className="tickets-area flex-container-column">
          <div className="header-area flex-container-row-vcenter">
            <h2 className="tickets-title"> Tickets: </h2>
            {showButton ?
              <span>
                <button type="button" className="tickets-purchase-button btn btn-primary"
                  data-toggle="modal" data-target="#TicketsModal"> Purchase </button>
              </span>
              : ''}
          </div>
          <div className="flex-container-row-vcenter">
            {userTickets.map(ticket => (
              <div key={ticket.id.toString()} className={`ticket-area flex-container-column-hcenter ${ticket.isReserved ? "dark-red" : "light-green"}`}>
                {ticket.isReserved ?
                  <img alt="reject-icon" className="cancel-ticket" onClick={()=> setConfirmedTicket(ticket)} data-toggle="modal" data-target={'#cancelTicket' + ticket.id} src={Delete} />
                  : ''}
                <img className="ticket-image" alt="pitch" src={Ticket} />
                <div className="flex-container-row-hcenter">
                  <div className="seat-number-area">
                    <img alt="pitch" src={Seat} />
                    <span> {ticket.seatID} </span>
                  </div>
                  <div className="price-area">
                    <img alt="pitch" src={Price} />
                    <span> {ticket.price} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> : ''}
    </div>
    </>
  );
}
export default MatchReservationSeats;