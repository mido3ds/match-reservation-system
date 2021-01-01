import React, {Component} from 'react';
import MatchCard from '../../Matches/MatchCard/MatchCard';
import UserCard from '../../Users/UserCard/UserCard';

class CardComponent extends Component {
    components = {
        match: MatchCard,
        user: UserCard
    };

    render() {
        const TagName = this.components[this.props.id];
        return <TagName card={this.props.card}/>
     }
}
export default CardComponent;