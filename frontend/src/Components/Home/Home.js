import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { isLoggedIn, userType } from '../../Auth';
import Stadiums from "../../images/match.png";
import Matches from "../../images/ball2.jpg";
import Users from "../../images/fans.jpg";
import Tickets from "../../images/tickets-header.jpeg";
import HomeCard from './Card/HomeCard';
import HomeHeader from './HomeHeader/HomeHeader';
import LoginCard from './Login/LoginCard';
import Register from './Register/Register';
import './Home.css';

function Home() {
  let { state } = useLocation();
  let history = useHistory();

  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  // useEffect with an empty array as a second parameter resembles componentDidMount in class components
  useEffect(() => {
    if (state?.from) {
      // We arrived at the home page as a result of an authorization indirection
      console.log("Authorization redirection to home");
      if (/*user not logged in*/false) {
        // TODO: Replace with a nice popup
        alert("You don't have access to this page");
      } else {
        // TODO: Replace with a nice popup
        alert("Please log in or create an account to be able access this page");
        setRedirectOnLogin(true);
        setRedirectTo(state.from);
      }
    }
  }, [state]);

  // TODO: call this function if a user logs in successfully
  let onSuccessfulLogin = () => {
    if (redirectOnLogin) {
      history.replace(redirectTo);
    };
  };

  return (
    <>
      <HomeHeader />
      <div className="home-cards-area flex-container-row-vcenter-hcenter">
          <div className="home-card-item">
            <Link to='/matches'>
              {/* TODO: replace with a card */}
              <HomeCard img={Matches} name="Matches" />
              {/* <button type="button" className="btn btn-light"> Matches </button> */}
            </Link>
          </div>
          <div className="home-card-item">
            <Link to='/stadiums'>
              {/* TODO: replace with a card */}
              <HomeCard img={Stadiums} name="Stadiums" />
              {/* <button type="button" className="btn btn-light"> Stadiums </button> */}
            </Link>
          </div>
          { isLoggedIn() && userType() === 'admin' ? 
            <div class="line-break"></div> : ''
          }
          {
            isLoggedIn() && userType() === 'admin' ?
              <div className="home-card-item">
                <Link to='/users'>
                  {/* TODO: replace with a card */}
                  <HomeCard img={Users} name="Users" />
                  {/* <button type="button" className="btn btn-light"> Users </button> */}
                </Link>
              </div> : ''
          }
          {
          isLoggedIn() ?
            '' :
            <div className="home-card-item">
                <LoginCard />
            </div>
         }

          {
          isLoggedIn() ?
            <div className="home-card-item">
              <Link to='/tickets'>
                <HomeCard img={Tickets} name="Tickets"/>
              </Link>
            </div>  : '' 
          }
      </div>
        {
        isLoggedIn() ?
            '' :
            <div>
                <Register />
            </div>
         }
    </>
  );
}

export default Home;