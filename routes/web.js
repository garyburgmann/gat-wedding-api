const router = require('express').Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../middleware/VerifyToken');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  return res.status(200).send({
    success: true,
    message: 'Web routes work.'
  })
});

module.exports = router;
