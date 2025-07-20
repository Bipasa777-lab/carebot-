const express = require('express');
const { signup, login, getProfile } = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
  check('profile.firstName', 'First name is required').notEmpty(),
  check('profile.lastName', 'Last name is required').notEmpty()
], signup);

router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
