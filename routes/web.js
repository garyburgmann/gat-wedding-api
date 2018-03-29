const router = require('express').Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../middleware/VerifyToken');
const {sendMail} = require('../services/MailService');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  return res.status(200).send({
    success: true,
    message: 'Web routes work.'
  })
});

router.get('/.well-known/acme-challenge/teLYZ_Q_boma2LqI4oeRzix4_fa-_AZ7AONh0SUKZWg', (req, res) => {
  return res.status(200).send('teLYZ_Q_boma2LqI4oeRzix4_fa-_AZ7AONh0SUKZWg.1X9RktjDKa82x_7uRL6x2Kth4L2BcviIVqtJD80OWQs');
});

router.post('/mail-test', async (req, res) => {
  const {err, info} = await sendMail(req.body.to, req.body.subject, req.body.text);

  if (err) {
    return res.status(400).send({
      success: false,
      error: err.response
    })
  }
  
  return res.status(200).send({
    success: true,
    data: info.response
  })
});

module.exports = router;
