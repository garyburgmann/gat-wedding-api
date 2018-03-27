module.exports = (app) => {

  const api = require('./api');
  app.use('/api', api);

  const web = require('./web');
  app.use('/', web);

}
