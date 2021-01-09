import { Redirect, Route } from "react-router-dom";

// A wrapper for <Route> that redirects to the home page if you don't have the required access level.
function AuthorizedRoute({ allowedUsers, children, ...rest }) {
    let userType = "admin"; // TODO: get the actual user type
    return (
        <Route {...rest} render={({ location }) =>
            allowedUsers.includes(userType) ?
                (children) :
                (<Redirect to={{ pathname: "/", state: { from: location } }} />)
        } />
    );
}

export default AuthorizedRoute;