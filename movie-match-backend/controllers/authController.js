const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({ name, email, passwordHash });
    await user.save();
    res.json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.saveFcmToken = async (req, res) => {
  const { fcmToken } = req.body;
  try {
    await User.findByIdAndUpdate(req.user.id, { fcmToken });
    res.json({ msg: 'FCM token saved' });
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 