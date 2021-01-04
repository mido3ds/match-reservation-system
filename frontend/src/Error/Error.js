import './Error.css';
import PlayerImage from '../images/player-kick.png'

function Error() {
  return (
        <div className="error-page container">
            <div className="row">
            <div className="col-md-6 align-self-center">
                <img alt='player-kic' src={PlayerImage} />
            </div>
            <div className="lost-message col-md-6 align-self-center">
                <h1>404</h1>
                <h2>UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist.
                How you got here is a mystery. But you can click the button below
                to go back to the homepage.
                </p>
                <button type="button" className="home-button btn btn-primary"> HOME </button>
            </div>
            </div>
        </div>
  );
}

export default Error;