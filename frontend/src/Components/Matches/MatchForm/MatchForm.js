import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Dropdown from "react-bootstrap/Dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DropArrow from "../../../images/down-arrow.png";
import { teams, logos } from "../../../teams";
import './MatchForm.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const stadiums = [
  { name: 'Borg Al Arab' },
  { name: 'Cairo Stadium' }
]

const schema = yup.object().shape({
  homeTeam: yup.string()
               .required('Required field.'),
  awayTeam: yup.string()
               .required('Required field.')
               .notOneOf([yup.ref('homeTeam')], 'Home team & away team must be different.'),
  venue: yup.string()
            .required('Required field.'),
  dateTime: yup.date()
               .required('Required field'),
  mainReferee: yup.string()
                  .required('Required field.')
                  .matches(/^[aA-zZ\s]+$/, 'Names must contain letters and spaces only.'),
  firstLinesman: yup.string()
                    .required('Required field.')
                    .matches(/^[aA-zZ\s]+$/, 'Names must contain letters and spaces only.'),
  secondLinesman: yup.string()
                     .required('Required field.')
                     .matches(/^[aA-zZ\s]+$/, 'Names must contain letters and spaces only.'),
  ticketPrice: yup.number()
                  .required('Required field.')
                  .typeError('Must be a number.')
                  .min(20, 'Ticket price cannot be less than 20 EGP')
});


function MatchForm({ title, saveChanges, id }) {
  const { register, handleSubmit, errors, setValue, trigger } = useForm({ resolver: yupResolver(schema) });

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // homeTeam, awayTeam, stadium and dateTime are not selected using native HTML forms.
  // Therefore, they cannot be directly binded with React Hook Form.
  // They must be registered, set and triggered manually.
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [stadium, setStadium] = useState('');
  const [dateTime, setDateTime] = useState(tomorrow);

  register('homeTeam');
  register('awayTeam');
  register('venue');
  register('dateTime');

  let onSelectHomeTeam = (homeTeam) => {
    setHomeTeam(homeTeam);
    setValue('homeTeam', homeTeam);
    trigger('homeTeam');
    trigger('awayTeam');
  }

  let onSelectAwayTeam = (awayTeam) => {
    setAwayTeam(awayTeam); 
    setValue('awayTeam', awayTeam);
    trigger('awayTeam');
  }

  let onSelectStadium = (stadium) => {
    setStadium(stadium); 
    setValue('venue', stadium);
    trigger('venue');
  }

  // The user could leave the date/time unchanged (which is valid), so if a callback similar to the ones
  // above is used, it may never be invoked, and we will never call setValue for dateTime. 
  // useEffect will be invoked when the dateTime state is initialized (and whenever it changes), 
  // guaranteeing that we always have value for date/time.  
  useEffect(() => {
    setValue('dateTime', dateTime);
    trigger('dateTime');
  }, [dateTime]);

  // result = { success: boolean, message: string }
  let onSubmit = async (match) => {
    let result = await saveChanges(match);
    alert(result.message);
    if (result.success) {
      window.location.reload();
    }
  }

  return (
    <div className="modal fade" id={ id } tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document"></div>
      <form className="form-area modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header">
          <h1 className="form-title"> {title} </h1>
        </div>
        <div className="modal-body match-form-modal-body flex-container-row">
          <div className="home-team-dd-area">
            <label className="info-text"> Home Team: </label>
            <Dropdown name='homeTeam' onSelect={onSelectHomeTeam} ref={register}>
              <Dropdown.Toggle className="dropdown-button">
                { homeTeam ?
                  <img className="button-team-logo" src={logos[homeTeam]} /> 
                  : "" }
                <span className="btn-black-text"> {homeTeam ? homeTeam : 'Select the home team..'} </span>
                <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="teams-dropdown-menu" >
                {teams.map(team =>
                  (<Dropdown.Item className="team-dd-item" key={team.id} eventKey={team.name}>
                  <img className="team-logo" alt={team.name + '-logo'} src={logos[team.name]} />
                  <span className="team-dd-item-text"> {team.name} </span>
                  </Dropdown.Item>)
                )}
              </Dropdown.Menu>
            </Dropdown>
            <p className='error-message'>{errors.homeTeam?.message}</p>
          </div>
          <div className="away-team-dd-area">
            <label className="info-text"> Away Team: </label>
            <Dropdown onSelect={onSelectAwayTeam}>
              <Dropdown.Toggle className="dropdown-button">
              { awayTeam ?
                  <img className="button-team-logo" src={logos[awayTeam]} /> 
                  : "" }
                <span className="btn-black-text"> {awayTeam ? awayTeam : 'Select the away team..'} </span>
                <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="teams-dropdown-menu" >
                {teams.map((team, index) =>
                  (<Dropdown.Item className="team-dd-item" key={team.id} eventKey={team.name}>
                  <img className="team-logo" alt={team.name + '-logo'} src={logos[team.name]} />
                  <span className="team-dd-item-text"> {team.name} </span>
                  </Dropdown.Item>)
                )}
              </Dropdown.Menu>
            </Dropdown>
            <p className='error-message'>{errors.awayTeam?.message}</p>
          </div>
          <div className="stadium-dd-area">
            <label className="info-text"> Match Venue: </label>
            <Dropdown onSelect={onSelectStadium}>
              <Dropdown.Toggle className="dropdown-button">
                <span className="btn-black-text"> {stadium ? stadium : 'Select the away stadium..'} </span>
                <img alt="dropdown-arrow-icon" className="dropdown-arrow" src={DropArrow} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="stadium-dropdown-menu">
                {stadiums.map((stadium, index) =>
                  (<Dropdown.Item className="stadium-dd-item" key={index} eventKey={stadium.name}>
                  <span className="stadium-dd-item-text"> {stadium.name} </span>
                  </Dropdown.Item>)
                )}
              </Dropdown.Menu>
            </Dropdown>
            <p className='error-message'>{errors.venue?.message}</p>
          </div>
          <div className="date-time-area">
            <label className="info-text"> Date Time: </label>
            <div>
              <DatePicker className="date-time-picker" selected={dateTime}
                onChange={setDateTime}
                minDate={tomorrow} 
                dateFormat="dd/MM/yyyy hh:mm aa"
                showTimeInput />
              <p className='error-message'>{errors.dateTime?.message}</p>
            </div>
          </div>
          <div className="main-referee-area">
            <label className="info-text"> Main Referee: </label>
            <input name="mainReferee" type="text" className="form-control input-text-area"
              id="MainRefereeInput" ref={register}></input>
            <p className='error-message'>{errors.mainReferee?.message}</p>
          </div>
          <div className="firstlinesman-area">
            <label className="info-text"> First Linesman: </label>
            <input name="firstLinesman" type="text" className="form-control input-text-area"
              id="FirstLinesmanInput" ref={register}></input>
            <p className='error-message'>{errors.firstLinesman?.message}</p>
          </div>
          <div className="secondlinesman-area">
            <label className="info-text"> Second Linesman: </label>
            <input name="secondLinesman" type="text" className="form-control input-text-area"
              id="SecondLinesmanInput" ref={register}></input>
            <p className='error-message'>{errors.secondLinesman?.message}</p>
          </div>
          <div className="firstlinesman-area">
            <label className="info-text"> Ticket Price: </label>
            <input name="ticketPrice" type="text" className="form-control input-text-area"
              id="TicketPriceInput" ref={register}></input>
            <p className='error-message'>{errors.ticketPrice?.message}</p>
          </div>
          <div className="match-form-buttons-area">
            <button type="submit" className="btn match-form-save-btn"> Save changes </button>
            <button type="button" className="btn match-form-close-btn" data-dismiss="modal"> Close </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MatchForm;