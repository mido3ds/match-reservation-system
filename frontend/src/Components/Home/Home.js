import { useState } from 'react';
import { Link } from "react-router-dom";
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
  const [loggedIn, checkLoggedIn] = useState(isLoggedIn());
  const [type, checkUserType] = useState(userType());

  return (
    <>
      <HomeHeader />
      <div className="home-cards-area flex-container-row-vcenter-hcenter">
          <div className="home-card-item">
            <Link to='/matches'>
              <HomeCard img={Matches} name="Matches" />
            </Link>
          </div>
          <div className="home-card-item">
            <Link to='/stadiums'>
              <HomeCard img={Stadiums} name="Stadiums" />
            </Link>
          </div>
          { loggedIn && type === 'admin' ? 
            <div className="line-break"></div> : ''
          }
          {
            loggedIn && type === 'admin' ?
              <div className="home-card-item">
                <Link to='/users'>
                  <HomeCard img={Users} name="Users" />
                </Link>
              </div> : ''
          }
          {
          loggedIn ?
            '' :
            <div className="home-card-item">
                <LoginCard login={checkLoggedIn.bind(this)} userType={checkUserType.bind(this)}/>
            </div>
         }

          {
          loggedIn ?
            <div className="home-card-item">
              <Link to='/tickets'>
                <HomeCard img={Tickets} name="Tickets"/>
              </Link>
            </div>  : '' 
          }
      </div>
        {
        loggedIn ?
            '' :
            <div>
                <Register />
            </div>
         }
    </>
  );
}

export default Home;