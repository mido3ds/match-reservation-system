import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { logout } from '../../Auth';
import Navigation from '../../images/menu.png';
import PremieurLeagueLogo from '../../images/premier-league-logo.png';
import './Navbar.css';

function LoggedInButtons({ setLoggedIn }) {
    return (
        <>
            <img alt="navigation-icon" className="navigation-icon dropdown-toggle"
                src={Navigation} href="#" role="button"
                id="navbarDropDownMenu" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" />
            <div className="dropdown-menu navigation-menu" aria-labelledby="navbarDropDownMenu">
                <Link to="/edit-profile">
                    <button className="navbar-dd-item dropdown-item"> Edit Proifle </button>
                </Link>
                <Link to="/">
                    <button className="navbar-dd-item dropdown-item"> Logout </button>
                </Link>
            </div>
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
        </>
    );
}

function Navbar({ loggedIn, setLoggedIn }) {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
        // eslint-disable-next-line
    }, []);

    let toggleNavbar = () => {
        var navbar = window.$(".page-navbar")[0];
        var text =  window.$(".brand-text")[0];
        var logo =  window.$(".brand-logo")[0];
        var buttons =  window.$(".navbar-button-area")[0];
        var editButton =  window.$(".edit-profile-button")[0];
        var logOutButton =  window.$(".log-out-profile-button")[0];
        navbar.classList.toggle("is-active");
        text.classList.toggle("is-active");
        logo.classList.toggle("is-active");
        buttons?.classList.toggle("is-active");
        editButton?.classList.toggle("is-active");
        logOutButton?.classList.toggle("is-active");
    }

    let handleScroll = (event) => {
        var navbar = window.$(".page-navbar")[0];
        if (window.pageYOffset > 0) {
            if (!navbar.classList.contains("is-active")) {
                toggleNavbar()
            }
        } else {
            if (navbar.classList.contains("is-active")) {
                toggleNavbar()
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
            {loggedIn ? <LoggedInButtons setLoggedIn={setLoggedIn} /> : <div />}
        </nav>
    );
}

export default Navbar;