const Match = require('../models/Match');
const User = require('../models/User');
const fetch = require('node-fetch');

async function checkAndCreateMatch(userId, movieId) {
  const user = await User.findById(userId);
  const friends = await User.find({ _id: { $in: user.friends } });
  let matches = [];
  for (const friend of friends) {
    const liked = friend.likedMovies.find(m => m.movieId === movieId);
    if (liked) {
      // Check if match already exists
      const exists = await Match.findOne({
        users: { $all: [userId, friend._id] },
        movieId
      });
      if (!exists) {
        const match = await Match.create({
          users: [userId, friend._id],
          movieId
        });
        matches.push({ match, friend });
      }
    }
  }
  return matches;
}

module.exports = { checkAndCreateMatch }; 