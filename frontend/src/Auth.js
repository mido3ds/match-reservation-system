import Cookies from 'js-cookie';

export function isLoggedIn() {
    try {
        return authToken() && userType();
    } catch (e) {
        return false;
    }
}

export function userType() {
    return Cookies.get('usertype');
}

export function setUserType(type) {
    if (type && ['fan', 'manager', 'admin'].includes(type)) {
        Cookies.set('usertype', type);
    } else {
        throw Error('invalid type to store');
    }
}

export function authToken() {
    return Cookies.get('authtoken');
}

export function setAuthToken(token) {
    if (token && token.length > 0) {
        Cookies.set('authtoken', token);
    } else {
        throw Error('invalid token to store');
    }
}

export function logout() {
    if (!isLoggedIn()) {
        console.error('cant logout and its not logged in');
        return;
    }
    Cookies.remove('authtoken');
    Cookies.remove('usertype');
}