import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken } from '../../Auth';
import { NotificationManager } from 'react-notifications';
import CardsArea from '../CardsArea/CardsArea';
import UsersHeader from './UsersHeader/UsersHeader';
import { logout } from '../../Auth';

const api = new DefaultApi();

function Users({ setLoggedIn }) {
  const [stateCounter, setStateCount] = useState(0);
  let refresh = () => { console.log('refresh'); setStateCount(stateCounter + 1);}

  const [hasNext, setHasNext] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  let getUsers = async () => {
    try {
      const resp = await api.getUsers(authToken(), page);
      setHasNext(resp.data.has_next);
      setUsers(resp.data.users.map((user, i) => { 
        user.id = i; 
        user.removeCard = refresh;
        return user; 
      }));
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err?.response?.data?.noUser) {
        logout();
        setLoggedIn(false);
        NotificationManager.error('Session ended, please login again');
      }
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [page, stateCounter]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <UsersHeader />
      <CardsArea cards={users} hasNext={hasNext} cardIdentifier="user" onSetPage={setPage} />
    </div>
  );
}

export default Users;