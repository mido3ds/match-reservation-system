import { useEffect, useState } from 'react';
import CardsArea from '../CardsArea/CardsArea';
import TicketsHeader from './TicketsHeader/TicketsHeader';
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import { authToken } from '../../Auth';

const api = new DefaultApi();

function Tickets() {
  const [hasNext, setHasNext] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);

  let removeTicket = (id) => {
    setTickets(tickets => {
      return tickets.filter(ticket => { return ticket.id !== id })
    });
  }

  let getTickets = async () => {
    try {
      const resp = await api.getTickets(authToken(), page);
      const {tickets, matches, has_next} = resp.data;
      setHasNext(has_next);
      setTickets(tickets.map((ticket, i) => {
        ticket.id = i;
        ticket.removeCard = () => { removeTicket(i); };
        ticket.match = matches.find(match => match.uuid === ticket.matchUUID)
        return ticket;
      }));
    } catch (err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getTickets();
    // eslint-disable-next-line
  }, [page]);

  return (
  <div className="flex-container-column-vcenter-hcenter">
    <TicketsHeader />
    <CardsArea cards={tickets} hasNext={hasNext} cardIdentifier="ticket" onSetPage={setPage} />
  </div>
  );
}

export default Tickets;