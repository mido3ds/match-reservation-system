import './StadiumCard.css';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import Delete from "../../../images/delete2.png";
import { DefaultApi } from '../../../api';
import { authToken } from '../../../Auth';

const api = new DefaultApi();


function StadiumCard({ card }) {
  const {removeCard, ...stadium} = card;

  let deleteStadium = async () => {
    // stadium.id -> frontend card id
    // stadium.uuid -> actual id of the match
    const resp = await api.deleteStadium(authToken(), stadium.uuid);
    if (resp.status == 200) {
      alert('Stadium deleted successfully!');
      removeCard();
    } else {
      alert('A problem occurred during deleting the stadium.');
      console.error(`api.deleteStadium returned ${resp.status}`);
    }
  }

  return (
    <div className="stadium-card flex-container-col-centered">
      <img alt="remove-stadium-icon" className="remove-icon" src={Delete} data-toggle="modal" 
           data-target={'#deleteModal' + stadium.id}/>
      <ConfirmationModal id={'deleteModal' + stadium.id} 
                         text={ 'Are you sure you want to delete this stadium? '}
                         onOK={ deleteStadium } />
      <h1 className="name-area">{stadium.name}</h1>
      <h2 className="city-area">{stadium.city}</h2>
    </div>
  );
}

export default StadiumCard;