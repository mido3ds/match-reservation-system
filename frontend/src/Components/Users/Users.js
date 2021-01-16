import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken } from '../../Auth';
import { NotificationManager } from 'react-notifications';
import CardsArea from '../CardsArea/CardsArea';
import UsersHeader from './UsersHeader/UsersHeader';

const api = new DefaultApi();

function Users() {
  const [hasNext, setHasNext] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  let removeUser = (id) => {
    setUsers(users => {
      return users.filter(user => { return user.id !== id })
    });
  }

  let getUsers = async () => {
    try {
      const resp = await api.getUsers(authToken(), page);
      setHasNext(resp.data.has_next);
      setUsers(resp.data.users.map((user, i) => { 
        user.id = i; 
        user.removeCard = () => { removeUser(i); };
        return user; 
      }));
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="flex-container-col">
      <UsersHeader />
      <CardsArea cards={users} hasNext={hasNext} cardIdentifier="user" onSetPage={setPage} />
    </div>
  );
}

export default Users;