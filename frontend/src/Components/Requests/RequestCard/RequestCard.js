import './RequestCard.css';
import '../../Users/UserCard/UserCard.css';
import { DefaultApi } from '../../../api';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import ManagerImage from "../../../images/manager.png";
import { authToken } from '../../../Auth';
import { NotificationManager } from 'react-notifications';


const api = new DefaultApi();

function RequestCard({ card }) {
  const {removeCard, ...requestedManager} = card;

  requestedManager.birthDate = requestedManager.birthDate.slice(0,10).replace(/-/g,'/');
  requestedManager.name = requestedManager.firstName + ' ' + requestedManager.lastName;

  let acceptManagerRequest = async () => {
    try {
      const resp = await api.acceptManagersRequest(authToken(), requestedManager.username);
      NotificationManager.success(resp.data?.msg);
      removeCard();
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  let rejectManagerRequest = async () => {
    try {
      const resp = await api.rejectManagersRequest(authToken(), requestedManager.username);
      NotificationManager.success(resp.data?.msg);
      removeCard();
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    } 
  }

  return (
    <div className="request-card flex-container-column-vcenter">
      <img alt="accept-icon" className="accept" src="https://www.flaticon.com/svg/static/icons/svg/58/58679.svg" 
           data-toggle="modal" data-target={'#acceptModal'+ requestedManager.id}/>
      <ConfirmationModal id={'acceptModal'+ requestedManager.id} 
                         text={ 'Are you sure you want to accept the management request of ' + requestedManager.name + '?'}
                         onOK={ acceptManagerRequest } />
      <img alt="reject-icon" className="reject" src="https://www.flaticon.com/svg/static/icons/svg/58/58253.svg" 
            data-toggle="modal" data-target={'#rejectModal' + requestedManager.id}/>
      <ConfirmationModal id={'rejectModal' + requestedManager.id} 
                         text={ 'Are you sure you want to reject the management request of ' + requestedManager.name + '?'}
                         onOK={ rejectManagerRequest } />
      <div className="role-badge">
        <img alt="role-bage" src={ManagerImage} />
      </div>
      <p className="user-name"> { requestedManager.name } </p>
      <p className="user-username"> { '@' + requestedManager.username } </p>

      <div className="flex-container-column-vcenter-hcenter">
        <div className="address-area">
          <img alt="address-icon" src="https://www.flaticon.com/svg/static/icons/svg/1076/1076323.svg" />
          <span> { requestedManager.address } </span>
        </div>
        <div className="email-area">
          <img alt="email-icon" src="https://www.flaticon.com/svg/static/icons/svg/732/732200.svg" />
          <span> { requestedManager.email } </span>
        </div>
        <div className="flex-container-row-vcenter">
          <div className="gender-area">
            <img alt="gender-icon" src="https://www.flaticon.com/svg/static/icons/svg/3939/3939800.svg" />
            <span> { requestedManager.gender } </span>
          </div>
          <div className="birthdate-area">
            <img alt="birthdate-icon" src="https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg" />
            <span> { requestedManager.birthDate } </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;