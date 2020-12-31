import React, {Component} from 'react';
import MatchCard from '../../Matches/MatchCard/MatchCard';


class CardComponent extends Component {
    components = {
        match: MatchCard,
    };

    render() {
        const TagName = this.components[this.props.id];
        return <TagName card={this.props.card}/>
     }
}
export default CardComponent;