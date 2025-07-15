const express = require('express');
const {register, login, getProfile, updateProfile, logout} = require('../controller/userController');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/logout', logout);


module.exports = router;