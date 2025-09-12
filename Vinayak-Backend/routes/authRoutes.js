const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { register, login, me } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');


// register
router.post('/register', register);


// login
router.post('/login', login);

// get current user
router.get('/me', verifyToken, me);


module.exports = router;