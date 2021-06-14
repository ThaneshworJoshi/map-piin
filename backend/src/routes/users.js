const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register User

router.post('/register', async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user and send response
    const user = await newUser.save();

    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login

router.post('/login', async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json('Wrong Credential');
    }

    // Validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(400).json('Wrong Credential');
    }

    // Send response
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
