import Tickets from "../../../images/tickets-header.webp";
import './TicketsHeader.css';


function TicketsHeader() {
  return (
    <div className="tickets-header">
      <img className="tickets-header-image" alt="tickets-header" src={Tickets} />
      <div className="tickets-text-block">
        <h1> Tickets </h1>
      </div>
    </div>
  );
}

export default TicketsHeader;