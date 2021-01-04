import './Navbar.css';
import React from 'react';
import { Link } from "react-router-dom";
import PremieurLeagueLogo from '../../images/premier-league-logo.png'
import { isShorthandPropertyAssignment } from 'typescript';

let lastScrollY = 0;
let ticking = false;

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

    logOut = () => {
        // TODO
    }

    render() {
        return (
            <nav className="page-navbar flex-container-row-vcenter">
                <Link to="/">
                    <img className="brand-logo" alt="brand-logo" src={PremieurLeagueLogo}/>
                </Link>
                <Link to="/" className="text-link">
                    <p className="brand-text">  Egyptian Premier League </p>
                </Link>
                <div className="navbar-button-area flex-container-row-vcenter-hcenter">
                    <Link to="/edit-profile">
                        <button type="button" className="edit-profile-button btn btn-primary"> Edit Profile </button>
                    </Link>
                    <Link to="/">
                        <button type="button" className="log-out-profile-button btn btn-light" onClick={this.logOut}> Logout </button>
                    </Link>
                 </div>
            </nav>
        );
    }
}

export default Navbar;