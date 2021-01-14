import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropArrow from "../../../images/down-arrow.png";
import Logo2 from "../../../images/teams_logos_30x30/7.png";
import Logo3 from "../../../images/teams_logos_30x30/8.png";
import Logo1 from "../../../images/teams_logos_30x30/9.png";
import './MatchForm.css';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';


function MatchForm({ title, onSubmit, id }) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className="time-input-field"
    />)

  return (
    <div className="modal fade" id={ id } tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document"></div>
      <div className="form-area modal-content">
        <div className="modal-header">
          <h1 className=" form-title"> {title} </h1>
        </div>
        <div className="modal-body match-form-modal-body flex-container-row">
          <div className="home-team-dd-area">
            <span className="info-text"> Home Team: </span>
            <div className="dropdown show">
              <a className="dropdown-button btn text-left dropdown-toggle" href="#" role="button"
                id="homeTeamDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="flase">
                Choose...
                      <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </a>

              <div className="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo1} />
                  <span className="team-dd-item-text"> Smouha </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo2} />
                  <span className="team-dd-item-text"> El-Zamalek </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo3} />
                  <span className="team-dd-item-text"> Pyramids </span>
                </a>
              </div>
            </div>
          </div>
          <div className="away-team-dd-area">
            <span className="info-text"> Away Team: </span>
            <div className="dropdown show">
              <a className="dropdown-button btn text-left dropdown-toggle" href="#" role="button"
                id="homeTeamDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="flase">
                Choose...
                      <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </a>

              <div className="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo1} />
                  <span className="team-dd-item-text"> Smouha </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo2} />
                  <span className="team-dd-item-text"> El-Zamalek </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img alt="ahly" src={Logo3} />
                  <span className="team-dd-item-text"> Pyramids </span>
                </a>
              </div>
            </div>
          </div>
          <div className="stadium-dd-area">
            <span className="info-text"> Match Venue: </span>
            <div className="dropdown show">
              <a className="dropdown-button btn text-left dropdown-toggle" href="#" role="button"
                id="homeTeamDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="flase">
                Choose...
                <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </a>

              <div className="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  <span className="stadium-dd-item-text"> Smouha </span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="stadium-dd-item-text"> El-Zamalek </span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="stadium-dd-item-text"> Pyramids </span>
                </a>
              </div>
            </div>
          </div>
          <div className="date-time-area">
            <span className="info-text"> Date Time: </span>
            <div>
              <DatePicker className="date-time-picker" selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeInput
                customTimeInput={<ExampleCustomTimeInput />} />
            </div>
          </div>
          <div className="main-referee-area">
            <span className="info-text"> Main Referee: </span>
            <input type="text" className="form-control input-text-area"
              id="MainRefereeInput"></input>
          </div>
          <div className="firstlinesman-area">
            <span className="info-text"> First Linesman: </span>
            <input type="text" className="form-control input-text-area"
              id="FirstLinesmanInput"></input>
          </div>
          <div className="secondlinesman-area">
            <span className="info-text"> Second Linesman: </span>
            <input type="text" className="form-control input-text-area"
              id="SecondLinesmanInput"></input>
          </div>
          <ConfirmationModal  id={id + "Confirmation"} 
                            text={title == "Add Match" ? 
                                  'Are you sure you want to add this match ?' :
                                  'Are you sure you want to edit this match ?' }
                            onOK={ onSubmit } />
          <div className="match-form-buttons-area">
            <button type="button" className="btn match-form-save-btn" 
                    data-toggle="modal" data-target={'#' + id + "Confirmation"}> Save changes </button>
            <button type="button" className="btn match-form-close-btn" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchForm;