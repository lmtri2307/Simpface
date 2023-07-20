var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { verifyUser } = require('../utils/tokenHandler');


/* GET auth listing. */
router.post('/register',  authController.register);

router.post('/login', authController.login)

router.get('/', authController.checkAuth)

router.get('/logout', verifyUser, authController.logout)

module.exports = router;
