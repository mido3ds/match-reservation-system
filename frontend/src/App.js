import './App.css';
import { Route, Switch } from "react-router-dom";
import Matches from './Components/Matches/Matches'
import Stadiums from './Components/Stadiums/Stadiums'
import EditProfile from './Components/EditProfile/EditProfile'
import Users from './Components/Users/Users'
import MatchReservation from './Components/MatchReservation/MatchReservation'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import ManagementRequests from './Components/ManagementRequests/ManagementRequests'
import ErrorPage from './Components/Error/Error'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/edit-profile'>
          <EditProfile/>
        </Route>
        <Route path='/matches'>
          <Matches/>
        </Route>
        <Route path='/match-reservation/:match_id'>
          <MatchReservation/>
        </Route>
        <Route path='/stadiums'>
          <Stadiums/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/management-requests'>
          <ManagementRequests/>
        </Route>
        <Route path='*'>
          <ErrorPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
