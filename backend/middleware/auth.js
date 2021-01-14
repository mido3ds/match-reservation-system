const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ err: 'No token' });

  try {
    const decoded = jwt.verify(token, config.get('jwt_private_key'));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({ err: 'Invalid token!' });
  }
}

module.exports = auth;