const router = require('express').Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../middleware/VerifyToken');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const AuthController = require('../controllers/AuthController');
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

const UserController = require('../controllers/UserController');
router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.get('/users/:id', VerifyToken, UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

// catch not found routes
router.use( (req, res, next) => {
  return res.status(404).send({ 
    success: false, 
    message: 'Not found', 
    data: req.body 
  });
});

module.exports = router;
