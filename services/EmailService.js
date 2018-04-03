const nodemailer = require('nodemailer');
const { MAIL } = require('../settings');


const transporter = nodemailer.createTransport({
  service: MAIL.MAIL_SERVICE,
  auth: {
         user: MAIL.MAIL_USER,
         pass: MAIL.MAIL_PASS
  }
});

module.exports = {
  sendMail: async (to, subject, text) => {

    const mailOptions = {
      from: MAIL.MAIL_USER, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: `<p>${text}</p>`,// plain text body
      dsn: {
        id: to,
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: MAIL.MAIL_USER
      }
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return {info: info};
    } catch (err) {
      return {err: err};
    }

  }
}
