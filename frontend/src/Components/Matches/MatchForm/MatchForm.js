import './MatchForm.css';
import React, { useState } from "react";
import DropArrow from "../../../images/down-arrow.png";
import Logo1 from "../../../images/teams_logos_30x30/9.png";
import Logo2 from "../../../images/teams_logos_30x30/7.png";
import Logo3 from "../../../images/teams_logos_30x30/8.png";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function MatchForm({}) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className="time-input-field"
    />)

  return (
    <div className="match-form">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div class="test modal fade" id="exampleModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document"></div>
          <div className="form-area modal-content">
            <div className="modal-header">
              <h1 className=" form-title"> Edit Match </h1>
            </div>
              <div class="modal-body match-form-modal-body flex-container-row">
                <div className = "home-team-dd-area">
                  <span className = "info-text"> Home Team: </span>
                  <div class="dropdown show">
                    <a class="dropdown-button btn text-left dropdown-toggle" href="#" role="button" 
                        id="homeTeamDropdownMenuLink" data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="flase">
                        Choose...
                      <img alt="dropdown-arrow-icon" className ="dropdown-arrow" src={DropArrow}/>
                    </a>
                    
                    <div class="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo1}/> 
                          <span className="team-dd-item-text"> Smouha </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo2}/> 
                          <span className="team-dd-item-text"> El-Zamalek </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo3}/> 
                          <span className="team-dd-item-text"> Pyramids </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className = "away-team-dd-area">
                  <span className = "info-text"> Away Team: </span>
                  <div class="dropdown show">
                    <a class="dropdown-button btn text-left dropdown-toggle" href="#" role="button" 
                        id="homeTeamDropdownMenuLink" data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="flase">
                        Choose...
                      <img alt="dropdown-arrow-icon" className ="dropdown-arrow" src={DropArrow}/>
                    </a>
                      
                    <div class="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo1}/> 
                          <span className="team-dd-item-text"> Smouha </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo2}/> 
                          <span className="team-dd-item-text"> El-Zamalek </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <img alt="ahly" src = {Logo3}/> 
                          <span className="team-dd-item-text"> Pyramids </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className = "stadium-dd-area">
                  <span className = "info-text"> Match Venue: </span>
                  <div class="dropdown show">
                    <a class="dropdown-button btn text-left dropdown-toggle" href="#" role="button" 
                        id="homeTeamDropdownMenuLink" data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="flase">
                        Choose...
                      <img alt="dropdown-arrow-icon" className ="dropdown-arrow" src={DropArrow}/>
                    </a>
                    
                    <div class="dropdown-menu" aria-labelledby="homeTeamDropdownMenuLink">
                      <a class="dropdown-item" href="#"> 
                          <span className="stadium-dd-item-text"> Smouha </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <span className="stadium-dd-item-text"> El-Zamalek </span>
                      </a> 
                      <a class="dropdown-item" href="#"> 
                          <span className="stadium-dd-item-text"> Pyramids </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className = "date-time-area">
                  <span className = "info-text"> Date Time: </span>
                  <div> 
                  <DatePicker className = "date-time-picker" selected={startDate}
                              onChange={date => setStartDate(date)}
                              showTimeInput
                              customTimeInput={<ExampleCustomTimeInput />} />
                  </div>
                </div>
                <div className = "main-referee-area">
                  <span className = "info-text"> Main Referee: </span>
                  <input type="text" class="form-control input-text-area" 
                        id="MainRefereeInput"></input>
                </div>
                <div className = "firstlinesman-area">
                  <span className = "info-text"> First Linesman: </span>
                  <input type="text" class="form-control input-text-area" 
                        id="FirstLinesmanInput"></input>
                </div>
                <div className = "secondlinesman-area">
                  <span className = "info-text"> Second Linesman: </span>
                  <input type="text" class="form-control input-text-area" 
                        id="SecondLinesmanInput"></input>
                </div>
                <div class="match-form-buttons-area">
                  <button type="button" class="btn match-form-save-btn" > Save changes </button>
                  <button type="button" class="btn match-form-close-btn" data-dismiss="modal">Close</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
  );

}

export default MatchForm;