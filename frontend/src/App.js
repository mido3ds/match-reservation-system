import './App.css';
import { Route, Switch } from "react-router-dom";
import AuthorizedRoute from './Components/AuthorizedRoute/AuthorizedRoute'
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
        <AuthorizedRoute path='/management-requests' allowedUsers={["admin"]}>
          <ManagementRequests/>
        </AuthorizedRoute>
        <Route path='*'>
          <ErrorPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
