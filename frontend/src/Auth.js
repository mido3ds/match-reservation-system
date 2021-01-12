import { Cookie } from 'js-cookie';

export function isLoggedIn() {
    try {
        return authToken() && userType();
    } catch (e) {
        return false;
    }
}

export function userType() {
    return Cookie.get('usertype');
}

export function setUserType(type) {
    if (type && (type === 'user' || type === 'manager' || type === 'admin')) {
        Cookie.set('usertype', type);
    } else {
        throw 'invalid type to store';
    }
}

export function removeUserType() {
    Cookie.remove('usertype');
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

export function removeAuthToken(token) {
    Cookie.remove('authoken');
}