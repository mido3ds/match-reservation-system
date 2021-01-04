import { Link } from "react-router-dom";
import HomeHeader from './HomeHeader/HomeHeader'

function Home() {

  return (
    <>
      <HomeHeader/>
      <Link to='/matches'>
        {/* TODO: replace with a card */}
        <button type="button" className="log-out-profile-button btn btn-light"> Matches </button>
      </Link>
      <Link to='/stadiums'>
        {/* TODO: replace with a card */}
        <button type="button" className="log-out-profile-button btn btn-light"> Stadiums </button>
      </Link>
      <Link to='/users'>
        {/* TODO: replace with a card */}
        {/* TODO: This should only appear to admins */}
        <button type="button" className="log-out-profile-button btn btn-light"> Users </button>
      </Link>
    </>
  );
}

export default Home;