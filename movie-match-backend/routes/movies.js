const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMovies } = require('../controllers/movieController');

router.get('/', auth, getMovies);

module.exports = router; 