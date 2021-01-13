function manager(req, res, next) {
  // 401 unauthorized
  // 403 forbidden
  let approved_manager = req.user.role == "manager" && req.user.isPending == false;
  if (!approved_manager) return res.status(403).send('Access denied');
  next();
}

module.exports = manager;