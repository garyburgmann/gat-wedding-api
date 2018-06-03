const router = require('express').Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../middleware/VerifyToken');
const {sendMail} = require('../services/EmailService');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const AuthController = require('../controllers/AuthController');
// router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', VerifyToken, AuthController.me);

const UserController = require('../controllers/UserController');
router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.get('/users/:id', VerifyToken, UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

const RSVPController = require('../controllers/RSVPController');
router.post('/rsvp', RSVPController.create);
router.put('/rsvp/:id', RSVPController.update);

// mail send
router.post('/email', async (req, res) => {
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

// catch not found routes
router.use( (req, res, next) => {
  return res.status(404).send({
    success: false,
    message: 'Not found',
    data: req.body
  });
});

module.exports = router;
