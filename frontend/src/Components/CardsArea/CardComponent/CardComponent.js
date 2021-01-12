import { useState } from 'react';
import MatchCard from '../../Matches/MatchCard/MatchCard';
import RequestCard from '../../Requests/RequestCard/RequestCard';
import StadiumCard from '../../Stadiums/StadiumCard/StadiumCard';
import UserCard from '../../Users/UserCard/UserCard';

function CardComponent({ id, card }) {
    const [components, _] = useState({
        match: MatchCard,
        user: UserCard,
        request: RequestCard,
        stadium: StadiumCard,
    })

    const TagName = components[id];
    return (<TagName card={card} />);
}

export default CardComponent;