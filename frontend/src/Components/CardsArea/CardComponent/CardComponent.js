import React, {Component} from 'react';
import MatchCard from '../../Matches/MatchCard/MatchCard';
import UserCard from '../../Users/UserCard/UserCard';
import RequestCard from '../../Requests/RequestCard/RequestCard';

class CardComponent extends Component {
    components = {
        match: MatchCard,
        user: UserCard,
        request: RequestCard
    };

    render() {
        const TagName = this.components[this.props.id];
        return <TagName card={this.props.card}/>
     }
}
export default CardComponent;