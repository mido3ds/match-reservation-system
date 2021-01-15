import './StadiumCard.css';
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
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
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
      <h1 className="name-area">{stadium.name}</h1>
      <h2 className="city-area">{stadium.city}</h2>
    </div>
  );
}

export default StadiumCard;