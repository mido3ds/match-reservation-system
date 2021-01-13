import { Redirect, Route } from "react-router-dom";
import { userType, isLoggedIn } from '../../Auth';

// A wrapper for <Route> that redirects to the home page if you don't have the required access level.
function AuthorizedRoute({ allowedUsers, children, ...rest }) {
    let type = !isLoggedIn() ? '' : userType();

    return (
        <Route {...rest} render={({ location }) =>
            allowedUsers === undefined || allowedUsers.includes(type) ?
                (children) :
                (<Redirect to={{ pathname: "/", state: { from: location } }} />)
        } />
    );
}

export default AuthorizedRoute;