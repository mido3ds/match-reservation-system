import React, {Component} from 'react'
import Pitch from "../../../images/pitch.png";
import Ticket from "../../../images/ticket.png";
import Seat from "../../../images/seat-icon-gray.png";
import Price from "../../../images/money.png";
import SeatPicker from 'react-seat-picker'
import TicketsForm from '../TicketsForm/TicketsForm'
import "./MatchReservationSeats.css";


export default class MatchReservationSeats extends Component {
  state = {
    loading: false
  }

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      this.setState({ loading: false })
    })
  }
 
  addSeatCallbackContinousCase = ({ row, number, id }, addCb, params, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      if (removeCb) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
        removeCb(params.row, params.number)
      }
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      this.setState({ loading: false })
    })
  }
 
  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      this.setState({ loading: false })
    })
  }

  render() {
    const tickets = []
    for (var i = 0; i < 10; i++) {
      tickets.push({ id: i })
    }

    const column_numbers = []
    for (var i = 1; i <= 10; i++) {
      column_numbers.push({ id: i })
    }

    const rows = [
      [{id: 1, number:1}, {id: 2, number:2}, null, {id: 3, number:3, isReserved: true}, {id: 4, number:4}, null, {id: 5, number:5}, {id: 6, number:6}, null, {id: 7, number:7}, {id: 8, number:8}, null, {id: 9, number:9}, {id: 10, number:10}],
      [{id: 11, number:1, isReserved: true}, {id: 12, number:2, isReserved: true}, null, {id: 13, number:3, isReserved: true}, {id: 14, number:4}, null, {id: 15, number:5}, {id: 16, number:6}, null, {id: 17, number:7}, {id: 18, number:8}, null, {id: 19, number:9}, {id: 20, number:10}],
      [{id: 21, number:1}, {id: 22, number:2}, null, {id: 23, number:3, isReserved: true}, {id: 24, number:4}, null, {id: 25, number:5}, {id: 26, number:6}, null, {id: 27, number:7}, {id: 28, number:8}, null, {id: 29, number:9}, {id: 30, number:10}]
    ]
    return (
      <div className="flex-container-row-hcenter">
        <div className="reservation-area flex-container-column-vcenter">
        <div className="column-numbers flex-container-row">
            {column_numbers.map(column_number => (
              <div className="column-number-area">
                <h3> {column_number.id} </h3>
              </div>
            ))}
          </div> 
        <div className = "seats-area">
            <SeatPicker
              addSeatCallback={this.addSeatCallback}
              removeSeatCallback={this.removeSeatCallback}
              rows={rows}
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
            {tickets.map(ticket => (
              <div className="ticket-area flex-container-column-hcenter">
                <img alt="reject-icon" className="cancel-ticket" src="https://www.flaticon.com/svg/static/icons/svg/58/58253.svg" />
                <img className="ticket-image" alt="pitch" src={Ticket}/>
                <div className="flex-container-row-hcenter">
                  <div className="seat-number-area"> 
                    <img alt="pitch" src={Seat}/>
                    <span> C8 </span>
                  </div>
                  <div className="price-area">
                    <img alt="pitch" src={Price}/>
                    <span> 8$ </span>
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
}
