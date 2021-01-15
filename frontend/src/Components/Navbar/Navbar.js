import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from '../../Auth';
import Navigation from '../../images/menu.png';
import PremieurLeagueLogo from '../../images/premier-league-logo.png';
import './Navbar.css';


function Navbar() {
    const [loggedin, setLoggedIn] = useState(isLoggedIn());

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    let handleScroll = (event) => {
        // Get the navbar
        var navbar = document.getElementsByClassName("page-navbar")[0];
        var text = document.getElementsByClassName("brand-text")[0];
        var logo = document.getElementsByClassName("brand-logo")[0];
        var buttons = undefined;
        var editButton = undefined;
        var logOutButton = undefined;
        if (isLoggedIn()) {
            buttons = document.getElementsByClassName("navbar-button-area")[0];
            editButton = document.getElementsByClassName("edit-profile-button")[0];
            logOutButton = document.getElementsByClassName("log-out-profile-button")[0];
        }

        if (window.pageYOffset > 0) {
            if (!navbar.classList.contains("is-active")) {
                navbar.classList.toggle("is-active");
                text.classList.toggle("is-active");
                logo.classList.toggle("is-active");
                if (isLoggedIn()) {
                    buttons.classList.toggle("is-active");
                    editButton.classList.toggle("is-active");
                    logOutButton.classList.toggle("is-active");
                }
            }

        } else {
            if (navbar.classList.contains("is-active")) {
                navbar.classList.toggle("is-active");
                text.classList.toggle("is-active");
                logo.classList.toggle("is-active");
                if (isLoggedIn()) {
                    buttons.classList.toggle("is-active");
                    editButton.classList.toggle("is-active");
                    logOutButton.classList.toggle("is-active");
                }
            }
        }
        
        event.preventDefault();
    };

    return (
        <nav className="page-navbar flex-container-row-vcenter">
            <Link to="/">
                <img className="brand-logo" alt="brand-logo" src={PremieurLeagueLogo} />
            </Link>
            <Link to="/" className="text-link">
                <p className="brand-text">  Egyptian Premier League </p>
            </Link>
            <img alt="navigation-icon" className="navigation-icon dropdown-toggle"
                src={Navigation} href="#" role="button"
                id="navbarDropDownMenu" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" />
            {
                loggedin ?
                    <div className="dropdown-menu navigation-menu" aria-labelledby="navbarDropDownMenu">
                    <Link to="/edit-profile">
                        <button className="navbar-dd-item dropdown-item"> Edit Proifle </button>
                    </Link>
                    <Link to="/">
                        <button className="navbar-dd-item dropdown-item"> Logout </button>
                    </Link>
                </div>
                : <div />
            }
            {
                loggedin ?
                    <div className="navbar-button-area flex-container-row-vcenter-hcenter">
                        <Link to="/edit-profile">
                            <button type="button" className="edit-profile-button btn btn-primary"> Edit Profile </button>
                        </Link>
                        <Link to="/">
                            <button type="button" className="log-out-profile-button btn btn-light" onClick={() => {
                                logout();
                                setLoggedIn(false);
                            }}> Logout </button>
                        </Link>
                    </div>
                    : <div />
            }
        </nav>
    );
}

export default Navbar;