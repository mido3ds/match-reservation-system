import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import UsersHeader from './UsersHeader/UsersHeader';

const api = new DefaultApi();

function Users() {
    const cards = []
    for (var i = 0; i < 4; i++) {
        cards.push({ id: i })
    }

    const [users, setUsers] = useState(cards);
    const [page, setPage] = useState(1);

    useEffect(async () => {
        const authToken = "TODO";
        const resp = await api.getUsers(authToken, page);
        if (resp.status == 200) {
            setUsers(resp.data.map((x, i) => { x.id = i; return x; }));
        } else {
            console.error(`api.getUsers returned ${resp.status}`);
        }
    }, [page]);

    return (
        <div className="flex-container-col">
            <UsersHeader />
            <CardsArea cards={users} cardIdentifier="user" onSetPage={setPage} />
        </div>
    );
}

export default Users;