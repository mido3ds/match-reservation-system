import React, { Component } from 'react';
import './HomeCard.css';

class HomeCard extends Component {
    state = {  }
    render() { 
        return (
            <div>
              <img className="image-responsive home-card-image border border-dark" data-toggle="tooltip" data-placement="bottom" title={this.props.name} alt={this.props.name} src={this.props.img} />
              <span className="home-card-text">
                {this.props.name}
              </span>
            </div>
        );
    }
}
 
export default HomeCard;