const User = require('../models/User');

exports.addFriend = async (req, res) => {
  const { email } = req.body;
  try {
    const friend = await User.findOne({ email });
    if (!friend) return res.status(404).json({ msg: 'User not found' });
    if (friend._id.equals(req.user.id)) return res.status(400).json({ msg: 'Cannot add yourself' });
    // Add each other as friends if not already
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { friends: friend._id } });
    await User.findByIdAndUpdate(friend._id, { $addToSet: { friends: req.user.id } });
    res.json({ msg: 'Friend added' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'name email');
    res.json(user.friends);
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 