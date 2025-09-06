const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', [
  check('fullName', 'Full name is required').notEmpty().trim(),
  check('email', 'Valid email is required').isEmail().normalizeEmail(),
  check('mobileNumber', 'Valid mobile number is required').isMobilePhone(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('confirmPassword', 'Password confirmation is required').notEmpty()
], signup);

router.post('/login', [
  check('emailOrMobile', 'Email or mobile number is required').notEmpty(),
  check('password', 'Password is required').notEmpty()
], login);

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
