const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


verifyToken = (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts[0] == 'Bearer' || parts[0] == 'Token') {
      token = parts[1];
      // console.log(token);
    } else {
      return res.status(400).send({ 
        success: false, 
        msg: 'Bearer or Token required', 
        data: parts[0] 
      });
    }
  } else if (req.body.token || req.query.token) {
    token = req.body.token || req.query.token;
  } else {
    return res.status(400).send({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  jwt.verify(token, secrets.APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send({ 
        success: false, 
        message: 'Failed to authenticate token' 
      });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = verifyToken;
