import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import HomeHeader from './HomeHeader/HomeHeader';

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
      <Link to='/matches'>
        {/* TODO: replace with a card */}
        <button type="button" className="btn btn-light"> Matches </button>
      </Link>
      <Link to='/stadiums'>
        {/* TODO: replace with a card */}
        <button type="button" className="btn btn-light"> Stadiums </button>
      </Link>
      <Link to='/users'>
        {/* TODO: replace with a card */}
        {/* TODO: This should only appear to admins */}
        <button type="button" className="btn btn-light"> Users </button>
      </Link>
      {/*This is just to test unauthorized redirection until log in is implemented:*/}
      <button type="button" className="btn btn-light" onClick={onSuccessfulLogin}> Successful Login </button>
    </>
  );
}

export default Home;