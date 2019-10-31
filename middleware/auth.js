const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  // console.log("header is "+req.get('x-auth-token'));
  // console.log("token is "+token);
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    console.log(decoded);
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}