const User = require('../models/User');
const { checkAndCreateMatch } = require('../utils/matchChecker');
const fetch = require('node-fetch');

async function sendFcmNotification(token, title, body) {
  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: token,
      notification: { title, body }
    })
  });
}

exports.swipe = async (req, res) => {
  const { movieId } = req.body;
  try {
    // Add to likedMovies if not already liked
    const user = await User.findById(req.user.id);
    if (!user.likedMovies.some(m => m.movieId === movieId)) {
      user.likedMovies.push({ movieId });
      await user.save();
    }
    // Check for matches
    const matches = await checkAndCreateMatch(req.user.id, movieId);
    // Notify both users if match found
    for (const { match, friend } of matches) {
      if (friend.fcmToken) {
        await sendFcmNotification(friend.fcmToken, 'MovieMatch!', 'You matched on a movie with a friend!');
      }
      if (user.fcmToken) {
        await sendFcmNotification(user.fcmToken, 'MovieMatch!', 'You matched on a movie with a friend!');
      }
    }
    res.json({ msg: 'Swipe recorded', matches: matches.map(m => m.match) });
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 