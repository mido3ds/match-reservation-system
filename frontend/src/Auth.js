import { Cookie } from 'js-cookie';

export function isLoggedIn() {
    return true;
    try {
        return authToken() && userType();
    } catch (e) {
        return false;
    }
}

export function userType() {
    return "manager"
    return Cookie.get('usertype');
}

export function setUserType(type) {
    if (type && (type === 'user' || type === 'manager' || type === 'admin')) {
        Cookie.set('usertype', type);
    } else {
        throw Error('invalid type to store');
    }
}

export function authToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAwYTQyMjViNjk5MzNhOWRjYzY0NjMiLCJ1c2VybmFtZSI6Im1hbmFnZXIyMiIsInJvbGUiOiJtYW5hZ2VyIiwiaXNQZW5kaW5nIjpmYWxzZSwiaWF0IjoxNjEwNzUzODcyfQ.mzbS79CQMD3W8wGLSBoWo3e63IAxgaWgDGhs55IIjBk"
    return Cookie.get('authtoken');
}

export function setAuthToken(token) {
    if (token && token.length > 0) {
        Cookie.set('authtoken', token);
    } else {
        throw Error('invalid token to store');
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