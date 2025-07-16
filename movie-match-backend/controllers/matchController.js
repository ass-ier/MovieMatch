const Match = require('../models/Match');
const User = require('../models/User');

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.user.id }).populate('users', 'name email');
    res.json(matches);
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 