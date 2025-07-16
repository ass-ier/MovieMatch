const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/friends', require('./routes/friends'));
app.use('/movies', require('./routes/movies'));
app.use('/swipe', require('./routes/swipes'));
app.use('/matches', require('./routes/matches'));

module.exports = app; 