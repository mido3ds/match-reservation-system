import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { isLoggedIn, userType } from '../../Auth';
import Stadiums from "../../images/match.png";
import Matches from "../../images/teams.png";
import Users from "../../images/users.png";
import HomeCard from './Card/HomeCard';
import HomeHeader from './HomeHeader/HomeHeader';
import Login_Card from './Login/Login_Card';
import Register from './Register/Register';

function Home() {
  let { state } = useLocation();
  let history = useHistory();

  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  // useEffect with an empty array as a second parameter resembles componentDidMount in class components
  useEffect(() => {
    if (state && state.from) {
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
  }, []);

  // TODO: call this function if a user logs in successfully
  let onSuccessfulLogin = () => {
    if (redirectOnLogin) {
      history.replace(redirectTo);
    };
  };

  return (
    <>
      <HomeHeader />
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Link to='/matches'>
              {/* TODO: replace with a card */}
              <HomeCard img={Matches} name="Matches" />
              {/* <button type="button" className="btn btn-light"> Matches </button> */}
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/stadiums'>
              {/* TODO: replace with a card */}
              <HomeCard img={Stadiums} name="Stadiums" />
              {/* <button type="button" className="btn btn-light"> Stadiums </button> */}
            </Link>
          </div>
          {
            isLoggedIn() && userType() === 'admin' ?
              <div className="col-sm-4">
                <Link to='/users'>
                  {/* TODO: replace with a card */}
                  <HomeCard img={Users} name="Users" />
                  {/* <button type="button" className="btn btn-light"> Users </button> */}
                </Link>
              </div> : <div />
          }
        </div>
        {
          isLoggedIn() ?
            <div /> :
            <div>
              <div className="row">
                <Login_Card />
              </div>
              <div className="row">
                <Register />
              </div>
            </div>
        }
      </div>
      {/*This is just to test unauthorized redirection until log in is implemented:*/}
      {/* <button type="button" className="btn btn-light" onClick={onSuccessfulLogin}> Successful Login </button> */}
    </>
  );
}

export default Home;