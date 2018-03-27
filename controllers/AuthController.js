const User = require('../models/User');
const { setToken, setPassword, checkPassword } = require('../services/AuthService');


exports.register = (req, res) => {
  // return res.status(200).send({msg: 'Auth @register route.', req: req.body});
  if (!req.body.password) {
    return res.status(400).send({ 
      success: false, 
      message: 'Password missing in request', 
      data: req.body 
    });
  }

  const hashedPassword = setPassword(req.body.password, 8);

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
    .then((user) => {
      const token = setToken({ id: user._id });

      // remove password in user object before returning
      const returnUser = JSON.parse(JSON.stringify(user));
      delete returnUser.password;

      return res.status(201).send({
        success: true, 
        message: 'New user successfully created', 
        data: returnUser,
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ 
        success: false, 
        message: 'There was a problem adding the information to the database.', 
        data: req.body, 
        error: `${err.code}: ${err.name}`
      });
    });
};


exports.login = (req, res) => {

  if ((!req.body.username && !req.body.email) || !req.body.password) {
    return res.status(400).send({ 
      success: false, 
      message: 'Missing data for authentication', 
      data: req.body 
    });
  } 
    
  if (req.body.email) {
    User.findOne({
      email: req.body.email
    }).select("+password")
      .then((user) => {
        if (!user) {
          return res.status(400).send({ 
            success: false, 
            message: 'User with that email not found', 
            data: req.body 
          });
        } 
        sendTokenAndUser(req, res, user);
      })
      .catch((err) => {
        return res.status(500).send({
          success: false, 
          message: 'Error on the server',
          error:  err
        });
      });
  } else if (req.body.username) {
    User.findOne({
      username: req.body.username
    }).select("+password")
      .then((user) => {
        if (!user) {
          return res.status(400).send({ 
            success: false, 
            message: 'User with that username not found', 
            data: req.body 
          });
        } 
        sendTokenAndUser(req, res, user);
      })
      .catch((err) => {
        return res.status(500).send({
          success: false, 
          message: 'Error on the server',
          error: err
        });
      });
  }
};


sendTokenAndUser = (req, res, user) => {
  const passwordIsValid = checkPassword(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(403).send({ 
      success: false, 
      message: 'Incorrect password.', 
      data: req.body 
    });
  }

  const token = setToken({ id: user._id });
  // remove password in user object before returning
  const returnUser = JSON.parse(JSON.stringify(user));
  delete returnUser.password;

  return res.status(200).send({ 
    success: true, 
    message: 'Successfully logged in.', 
    data: returnUser, 
    token: token 
  });
}
