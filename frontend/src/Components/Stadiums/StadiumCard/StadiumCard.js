import './StadiumCard.css';
import SmallStadium from "../../../images/small-stadium.webp";
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import { isLoggedIn, userType, authToken } from '../../../Auth';
import Delete from "../../../images/delete2.png";
import { DefaultApi } from '../../../api';
import { NotificationManager } from 'react-notifications';

const api = new DefaultApi();


function StadiumCard({ card }) {
  const {removeCard, ...stadium} = card;

  let deleteStadium = async () => {
    // stadium.id -> frontend card id
    // stadium.uuid -> actual id of the match
    try {
      const resp = await api.deleteStadium(authToken(), stadium.uuid);
      NotificationManager.success(resp.data?.msg);
      removeCard();
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
    <div className="stadium-card flex-container-col-centered">
      <span style={{ visibility: isLoggedIn() && userType() === 'manager' ? 'visible': 'hidden'}} >
      <img alt="remove-stadium-icon" className="remove-stadium-icon" src={Delete} data-toggle="modal" 
           data-target={'#deleteModal' + stadium.id}/>
      <ConfirmationModal id={'deleteModal' + stadium.id} 
                         text={ 'Are you sure you want to delete this stadium? '}
                         onOK={ deleteStadium } />
      </span>
      <img className='stadium-img' src={SmallStadium}/>
      <div className="name-area">{stadium.name}</div>
      <div className="city-area">{stadium.city}</div>
      <div className="capacity-area"><strong>Capacity:</strong> {stadium.rows * stadium.seatsPerRow} seats </div>
    </div>
  );
}

export default StadiumCard;