module.exports = {
  APP_SECRET: require('./config/secrets').APP_SECRET,
  MONGO: require('./config/mongo'),
  MAIL: require('./config/email')
};