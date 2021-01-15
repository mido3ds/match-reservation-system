import { Link } from "react-router-dom";
import { DefaultApi } from '../../../api';
import { isLoggedIn, userType, authToken } from '../../../Auth';
import { NotificationManager } from 'react-notifications';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import Delete from "../../../images/delete.png";
import Edit from "../../../images/edit.png";
import {teams, logos} from "../../../teams"
import './MatchCard.css';
import MatchForm from '../MatchForm/MatchForm';

const api = new DefaultApi();

function MatchCard({ card }) {
  const {removeCard, ...match} = card;

  let deleteMatch = async () => {
    // match.id -> frontend card id
    // match.uuid -> actual id of the match
    try {
    const resp = await api.deleteMatch(authToken(), match.uuid);
    NotificationManager.success(resp.data?.msg);
    removeCard();
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
      <div className='match-card-container'>
        <div className="match-card">
          <span style={{ visibility: isLoggedIn() && userType() === 'manager' ? 'visible': 'hidden'}} >
            <img alt="edit-icon" className="edit" src={Edit} data-toggle="modal" data-target={'#editMatchFormModal' + match.id}/> 
            <MatchForm title="Edit Match" onSubmit={()=>{console.log("Yousryyyy2")}} id={'editMatchFormModal' + match.id} />
            <img alt="delete-icon" className="delete" src={Delete} data-toggle="modal" data-target={'#deleteModal' + match.id}/>
            <ConfirmationModal id={'deleteModal' + match.id} 
                              text={ 'Are you sure you want to delete this match?'}
                              onOK={ deleteMatch } /> : ''
          </span> 
          <Link className="noHover" to={{ pathname: `/match-reservation/${ match.id }`, state: { } }}>
            <div className='flex-container-row-hcenter'>
              <div className="upper-area flex-container-row-hcenter" >
                <div className="home-team" >
                  <img alt="Logo" src={logos[match.homeTeam]} />
                  <p> { match.homeTeam } </p>
                </div>
                <div className="date-time" >
                  <p className="time"> {match.dateTime.getHours() + ":" + match.dateTime.getMinutes()} </p>
                  <p className="date"> match.dateTime.getDate() </p>
                </div>
                <div className="away-team" >
                  <img alt="Logo" src={logos[match.awayTeam]} />
                  <p> { match.awayTeam }  </p>
                </div>
              </div>
              <div className="middle-area flex-container-column-hcenter" >
                <span className="stadium">
                  <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
                  <span> { match.venue } </span>
                </span>
                <span className="referee" >
                  <img alt="referee-icon" src="https://www.flaticon.com/svg/static/icons/svg/850/850989.svg" />
                  <span> { match.mainReferee } </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default MatchCard;