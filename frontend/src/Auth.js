import { Cookie } from 'js-cookie';

export function isLoggedIn() {
    /*try {
        return authToken() && userType();
    } catch (e) {
        return false;
    }*/
    return true;
}

export function userType() {
    //return Cookie.get('usertype');
    return 'admin'
}

export function setUserType(type) {
    if (type && (type === 'user' || type === 'manager' || type === 'admin')) {
        Cookie.set('usertype', type);
    } else {
        throw 'invalid type to store';
    }
}

export function authToken() {
    return Cookie.get('authtoken');
}

export function setAuthToken(token) {
    if (token && token.length > 0) {
        Cookie.set('authtoken', token);
    } else {
        throw 'invalid token to store';
    }
}

export function logout() {
    if (!isLoggedIn()) {
        console.error('cant logout and its not logged in');
        return;
    }
    Cookie.remove('authoken');
    Cookie.remove('usertype');
}