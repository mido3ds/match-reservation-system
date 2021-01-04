import { useState } from 'react';
import MatchCard from '../../Matches/MatchCard/MatchCard';
import UserCard from '../../Users/UserCard/UserCard';

function CardComponent({id, card}) {
    const [components, _] = useState({
        match: MatchCard,
        user: UserCard
    })

    const TagName = components[id];
    return (<TagName card={card}/>);
}
export default CardComponent;