const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
const TOKEN_EXPIRY = '7d'; // Token expiry duration

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation failed during signup');
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, profile } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.info(`Signup attempt with existing email: ${email}`);
      return res.status(409).json({ error: 'Email already in use' });
    }

    const newUser = new User({
      email,
      password,
      profile
    });

    await newUser.save();

    const token = generateToken(newUser);

    logger.info(`New user registered: ${email}`);
    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        profile: newUser.profile
      }
    });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn(`Login failed - incorrect password: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    logger.info(`User logged in: ${email}`);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/auth/profile (secured route example)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    logger.error(`Profile fetch error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
