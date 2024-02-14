const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/home', auth.home);

router.post('/register', auth.register);

router.post('/login', auth.login);

router.get('/user', authMiddleware, auth.user);

module.exports = router;