const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likedMovies: [{
    movieId: String,
    likedAt: { type: Date, default: Date.now }
  }],
  fcmToken: { type: String }
});
module.exports = mongoose.model('User', UserSchema); 