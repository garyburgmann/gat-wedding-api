module.exports = (app) => {
  const UserController = require('./controllers/UserController');
  app.use('/api/users', UserController);

  const AuthController = require('./controllers/AuthController');
  app.use('/api/auth', AuthController);
}
