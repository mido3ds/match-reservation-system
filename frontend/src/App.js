import { Route, Switch } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import AuthorizedRoute from './Components/AuthorizedRoute/AuthorizedRoute';
import EditProfile from './Components/EditProfile/EditProfile';
import Error from './Components/Error/Error';
import Home from './Components/Home/Home';
import Matches from './Components/Matches/Matches';
import MatchReservation from './Components/MatchReservation/MatchReservation';
import Navbar from './Components/Navbar/Navbar';
import Requests from './Components/Requests/Requests';
import Stadiums from './Components/Stadiums/Stadiums';
import Users from './Components/Users/Users';
import Tickets from './Components/Tickets/Tickets';
import { NotificationContainer } from 'react-notifications';
import { isLoggedIn } from './Auth';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [sessionUUID] = useState(uuidv4());

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <div className='content'>
      <Switch>
        <Route exact path='/'>
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path='/edit-profile' allowedUsers={["fan", "manager", "admin"]}>
          <EditProfile setLoggedIn={setLoggedIn} />
        </Route>
        <Route path='/matches'>
          <Matches />
        </Route>
        <AuthorizedRoute path='/tickets' allowedUsers={["fan", "manager", "admin"]}>
          <Tickets />
        </AuthorizedRoute>
        <Route path='/match-reservation/:match_id'>
          <MatchReservation sessionUUID={sessionUUID} loggedIn={loggedIn} />
        </Route>
        <Route exact path='/stadiums'>
          <Stadiums />
        </Route>
        <AuthorizedRoute path='/users' allowedUsers={["admin"]}>
          <Users />
        </AuthorizedRoute>
        <AuthorizedRoute path='/management-requests' allowedUsers={["admin"]}>
          <Requests />
        </AuthorizedRoute>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <NotificationContainer/>
      </div>
    </div>
  );
}

export default App;
