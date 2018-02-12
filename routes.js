module.exports = (app) => {
  var UserController = require('./controllers/UserController');
  app.use('/users', UserController);

  var AuthController = require('./controllers/AuthController');
  app.use('/auth', AuthController);
}
