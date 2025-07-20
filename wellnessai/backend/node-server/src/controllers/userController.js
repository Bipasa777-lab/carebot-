const User = require('../models/User');
const logger = require('../utils/logger');

// GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    logger.error(`Get profile error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile: updates.profile || {}, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// PUT /api/users/preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { language, notifications, dataPrivacy } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        preferences: {
          language,
          notifications,
          dataPrivacy
        },
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Preferences updated', preferences: user.preferences });
  } catch (error) {
    logger.error(`Update preferences error: ${error.message}`);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

// PUT /api/users/emergency-contacts
exports.updateEmergencyContacts = async (req, res) => {
  try {
    const { emergencyContacts } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        emergencyContacts,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Emergency contacts updated', emergencyContacts: user.emergencyContacts });
  } catch (error) {
    logger.error(`Update emergency contacts error: ${error.message}`);
    res.status(500).json({ error: 'Failed to update emergency contacts' });
  }
};
