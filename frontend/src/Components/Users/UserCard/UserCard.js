import { DefaultApi } from '../../../api';
import { authToken } from '../../../Auth';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import Delete from "../../../images/delete2.png";
import FanImage from "../../../images/fan.png";
import ManagerImage from "../../../images/manager.png";
import './UserCard.css';

const api = new DefaultApi();


function UserCard({ card }) {
  const {removeCard, ...user} = card;

  user.birthDate = user.birthDate.slice(0,10).replace(/-/g,'/');
  user.name = user.firstName + ' ' + user.lastName;

  let deleteUser = async () => {
    const resp = await api.deleteUser(user.username, authToken());
    if (resp.status == 200) {
      alert(user.name + '\'s account was deleted successfully!');
      removeCard();
    } else {
      alert('A problem occurred during deleting ' + user.name + '\'s account.');
      console.error(`api.deleteUser returned ${resp.status}`);
    }
  }

  return (
    <div className="user-card flex-container-column-vcenter">
      <img alt="remove-user-icon" className="remove-icon" src={Delete} data-toggle="modal" data-target={'#deleteModal' + user.id}/>
      <ConfirmationModal id={'deleteModal' + user.id} 
                         text={ 'Are you sure you want to delete ' + user.name + '\'s account?'}
                         onOK={ deleteUser } />
      <div className="role-badge">
        <img alt="role-bage" src={ user.role == 'fan' ? FanImage : ManagerImage } />
      </div>
      <p className="user-name"> { user.name } </p>
      <p className="user-username"> { '@' + user.username } </p>

      <div className="flex-container-column-vcenter-hcenter">
        <div className="address-area">
          <img alt="address-icon" src="https://www.flaticon.com/svg/static/icons/svg/1076/1076323.svg" />
          <span> { user.address } </span>
        </div>
        <div className="email-area">
          <img alt="email-icon" src="https://www.flaticon.com/svg/static/icons/svg/732/732200.svg" />
          <span> { user.email } </span>
        </div>
        <div className="flex-container-row-vcenter">
          <div className="gender-area">
            <img alt="gender-icon" src="https://www.flaticon.com/svg/static/icons/svg/3939/3939800.svg" />
            <span> { user.gender } </span>
          </div>
          <div className="birthdate-area">
            <img alt="birthdate-icon" src="https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg" />
            <span> { user.birthDate } </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;