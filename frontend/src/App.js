import './App.css';
import Matches from './Components/Matches/Matches'
import Users from './Components/Users/Users'
import MatchReservation from './Components/MatchReservation/MatchReservation'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Home/Header/Header'

function App() {
  return (
    <div className="App">
      <Navbar />
      <MatchReservation />
    </div>
  );
}

export default App;
