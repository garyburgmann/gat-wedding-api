module.exports = {
  MAIL_SERVICE: process.env.MAIL_SERVICE ? process.env.MAIL_SERVICE : 'gmail',  // or your email provider
  MAIL_USER: process.env.MAIL_USER ? process.env.MAIL_USER : 'email address here', 
  MAIL_PASS: process.env.MAIL_PASS ? process.env.MAIL_PASS : 'email password here',
  MAIL_HOST: process.env.MAIL_HOST ? process.env.MAIL_HOST : 'mail host here'
}
