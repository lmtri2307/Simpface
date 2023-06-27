var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');


/* GET auth listing. */
router.post('/register', function(req, res, next) {
  authController.register(req, res)
});

router.post('/login', function(req,res){
  authController.login(req,res)
})

router.get('/', function(req, res, next){
  authController.checkAuth(req,res)
})

router.get('/logout', function(req, res, next){
  authController.logout(req, res)
})

module.exports = router;
