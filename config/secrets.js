module.exports = {
  APP_SECRET: process.env.NODE_ENV === 'production' ? process.env.APP_SECRET : 'development-key-here',
}