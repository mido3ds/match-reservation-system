import './App.css';
import Matches from './Components/Matches/Matches'
import Users from './Components/Users/Users'
import MatchReservation from './Components/MatchReservation/MatchReservation'
import Navbar from './Components/Navbar/Navbar'
import ConfirmationModal from './Components/ConfirmationModal/ConfirmationModal'
import HomeHeader from './Components/Home/HomeHeader/HomeHeader'
import Requests from './Components/Requests/Requests'
import Error from './Error/Error'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Requests />
    </div>
  );
}

export default App;
