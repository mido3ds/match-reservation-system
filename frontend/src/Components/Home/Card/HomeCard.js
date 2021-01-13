import React, { Component } from 'react';
import { isLoggedIn, userType } from '../../../Auth';
import './HomeCard.css';

class HomeCard extends Component {
    render() { 
        return (
            <div className="home-card">
              <img className="home-card-image" data-toggle="tooltip" data-placement="bottom" title={this.props.name} alt={this.props.name} src={this.props.img} />
              <div className={"home-card-text " + (isLoggedIn() && (userType() === 'manager' || userType() === 'fan') ? 'large-font-size' : 'small-font-size')}>
                {this.props.name}
              </div>
            </div>
        );
    }
}
 
export default HomeCard;