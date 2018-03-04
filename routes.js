module.exports = (app) => {
  var UserController = require('./controllers/UserController');
  app.use('/api/users', UserController);

  var AuthController = require('./controllers/AuthController');
  app.use('/api/auth', AuthController);
}
