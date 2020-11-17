const express = require('express');
const router = express.Router();


//Link Middleware
const auth = require('../middleware/auth');

//Link Controllers
const userCtrl = require('../controllers/user'); 

//Routes available and the endpoints
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.seeMyProfile);
router.delete('/', auth, userCtrl.deleteUser);
router.put('/', auth, userCtrl.updateUser);
module.exports = router;
