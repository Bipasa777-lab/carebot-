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

    const { fullName, email, mobileNumber, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      logger.info(`Signup attempt with existing email: ${email}`);
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Check if mobile number already exists
    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      logger.info(`Signup attempt with existing mobile: ${mobileNumber}`);
      return res.status(409).json({ error: 'Mobile number already in use' });
    }

    // Split full name into first and last name
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      password,
      profile: {
        firstName,
        lastName
      }
    });

    await newUser.save();

    const token = generateToken(newUser);

    logger.info(`New user registered: ${email}`);
    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
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
    const { emailOrMobile, password } = req.body;

    // Check if input is email or mobile number
    const isEmail = emailOrMobile.includes('@');
    const query = isEmail ? { email: emailOrMobile } : { mobileNumber: emailOrMobile };

    const user = await User.findOne(query);
    if (!user) {
      logger.warn(`Login failed - user not found: ${emailOrMobile}`);
      return res.status(404).json({ error: 'Invalid email/mobile or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn(`Login failed - incorrect password: ${emailOrMobile}`);
      return res.status(401).json({ error: 'Invalid email/mobile or password' });
    }

    const token = generateToken(user);

    logger.info(`User logged in: ${emailOrMobile}`);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
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

// PUT /api/auth/profile - Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, mobileNumber, location } = req.body;
    const userId = req.user.id;

    // Check if email is being changed and if it already exists
    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
      if (existingEmail) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    // Check if mobile number is being changed and if it already exists
    if (mobileNumber) {
      const existingMobile = await User.findOne({ mobileNumber, _id: { $ne: userId } });
      if (existingMobile) {
        return res.status(409).json({ error: 'Mobile number already in use' });
      }
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;
    if (location) updateData['profile.location'] = location;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`Profile updated for user: ${user.email}`);
    return res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    logger.error(`Profile update error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
