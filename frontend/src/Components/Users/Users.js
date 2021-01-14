import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken } from '../../Auth';
import CardsArea from '../CardsArea/CardsArea';
import UsersHeader from './UsersHeader/UsersHeader';

const api = new DefaultApi();

function Users() {
  const [hasNext, setHasNext] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  let removeUser = (id) => {
    setUsers(users => {
      return users.filter(user => { return user.id != id })
    });
  }

  useEffect(async () => {
    const resp = await api.getUsers(authToken(), page);
    if (resp.status == 200) {
      setHasNext(resp.data.has_next);
      setUsers(resp.data.users.map((user, i) => { 
        user.id = i; 
        user.removeCard = () => { removeUser(i); };
        return user; 
      }));
    } else {
      console.error(`api.getUsers returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-col">
      <UsersHeader />
      <CardsArea cards={users} hasNext={hasNext} cardIdentifier="user" onSetPage={setPage} />
    </div>
  );
}

export default Users;