const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed'
, error: err.message
     });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only on HTTPS in prod
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({ access_token: token });
};
