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
