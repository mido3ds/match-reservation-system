import { Cookie } from 'js-cookie';

export function isLoggedIn() {
    try {
        return authToken() && userType();
    } catch (e) {
        return false;
    }
}

export function userType() {
    return 'admin';
    return Cookie.get('usertype');
}

export function setUserType(type) {
    if (type && (type === 'user' || type === 'manager' || type === 'admin')) {
        Cookie.set('usertype', type);
    } else {
        throw 'invalid type to store';
    }
}

export function authToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZmMmI3NjI5ZTUwMDM5ZmFmZjFjMWYiLCJ1c2VybmFtZSI6Inlvc3J5bTkzX2FkbWluIiwicm9sZSI6ImFkbWluIiwiaXNQZW5kaW5nIjpmYWxzZSwiaWF0IjoxNjEwNjM3MTQ4fQ.S7tF8lx8phgtuU6PT0X_2UXGs8anN6WLHBdSt4z6k0o";
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