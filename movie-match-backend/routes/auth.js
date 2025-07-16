const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { register, login, saveFcmToken } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/fcm-token', auth, saveFcmToken);

module.exports = router; 