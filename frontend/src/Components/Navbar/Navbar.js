import React from 'react';
import './Navbar.css';
import PremieurLeagueLogo from '../../images/premier-league-logo.png'
import Navigation from '../../images/menu.png'

class Navbar extends React.Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
        
    handleScroll = event => {
        // Get the navbar
        var navbar = document.getElementsByClassName("page-navbar")[0];
        var text = document.getElementsByClassName("brand-text")[0];
        var logo = document.getElementsByClassName("brand-logo")[0];
        var buttons = document.getElementsByClassName("navbar-button-area")[0];
        var editButton = document.getElementsByClassName("edit-profile-button")[0];
        var logOutButton = document.getElementsByClassName("log-out-profile-button")[0];

        if (window.pageYOffset > 0) {
            navbar.classList.add("sticky")
            if(!navbar.classList.contains("is-active")) {
                navbar.classList.toggle("is-active");
                text.classList.toggle("is-active");
                logo.classList.toggle("is-active");
                buttons.classList.toggle("is-active");
                editButton.classList.toggle("is-active");
                logOutButton.classList.toggle("is-active");
            }
            
        } else {
            navbar.classList.remove("sticky");
            if(navbar.classList.contains("is-active")) {
                navbar.classList.toggle("is-active");
                text.classList.toggle("is-active");
                logo.classList.toggle("is-active");
                buttons.classList.toggle("is-active");
                editButton.classList.toggle("is-active");
                logOutButton.classList.toggle("is-active");
            }
        }

        event.preventDefault();
    };

    render() {
        return (
            <nav className="page-navbar flex-container-row-vcenter">
                <img className="brand-logo" alt="brand-logo" src={PremieurLeagueLogo}/>
                <p className="brand-text">  Egyptian Premier League </p>
                <img alt="navigation-icon" className ="navigation-icon dropdown-toggle" 
                    src={Navigation} href="#" role="button" 
                    id="navbarDropDownMenu" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="flase"/>
                <div className="dropdown-menu navigation-menu" aria-labelledby="navbarDropDownMenu">
                      <a className="navbar-dd-item dropdown-item" href="#"> Edit Proifle </a> 
                      <a className="navbar-dd-item dropdown-item" href="#"> Logout </a> 
                </div>
                <div className="navbar-button-area flex-container-row-vcenter-hcenter">
                    <button type="button" className="edit-profile-button btn btn-primary"> Edit Profile </button>
                    <button type="button" className="log-out-profile-button btn btn-light"> Logout </button>
                </div>
            </nav>
        );
    }
}

export default Navbar;