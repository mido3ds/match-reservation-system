function admin(req, res, next) {
  // 401 unauthorized
  // 403 forbidden
  if (!req.user.role == "admin") return res.status(403).send('Access denied');
  next();
}

module.exports = admin;