import './App.css';
import Matches from './Components/Matches/Matches'
import Users from './Components/Users/Users'
import MatchReservation from './Components/MatchReservation/MatchReservation'
import Navbar from './Components/Navbar/Navbar'
import MatchForm from './Components/Matches/MatchForm/MatchForm'

function App() {
  return (
    <div className="App">
      <Navbar />
      <MatchForm />
    </div>
  );
}

export default App;
