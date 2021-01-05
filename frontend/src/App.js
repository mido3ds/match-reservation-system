import './App.css';
import { Route, Switch } from "react-router-dom";
import AuthorizedRoute from './Components/AuthorizedRoute/AuthorizedRoute'
import Matches from './Components/Matches/Matches'
import Stadiums from './Components/Stadiums/Stadiums'
import EditProfile from './Components/EditProfile/EditProfile'
import Users from './Components/Users/Users'
import MatchReservation from './Components/MatchReservation/MatchReservation'
import Navbar from './Components/Navbar/Navbar'
import ConfirmationModal from './Components/ConfirmationModal/ConfirmationModal'
import HomeHeader from './Components/Home/HomeHeader/HomeHeader'
import Requests from './Components/Requests/Requests'
import Home from './Components/Home/Home'
import Error from './Components/Error/Error'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/edit-profile' allowedUsers={["fan", "manager", "admin"]}>
          <EditProfile/>
        </Route>
        <Route path='/matches'>
          <Matches/>
        </Route>
        <AuthorizedRoute path='/match-reservation/:match_id' allowedUsers={["fan", "manager", "admin"]}>
          <MatchReservation/>
        </AuthorizedRoute>
        <Route path='/stadiums'>
          <Stadiums/>
        </Route>
        <AuthorizedRoute path='/users' allowedUsers={["admin"]}>
          <Users/>
        </AuthorizedRoute>
        <AuthorizedRoute path='/requests' allowedUsers={["admin"]}>
          <Requests/>
        </AuthorizedRoute>
        <Route path='*'>
          <Error/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
