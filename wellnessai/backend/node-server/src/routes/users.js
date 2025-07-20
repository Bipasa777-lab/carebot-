const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);
router.put('/preferences', auth, userController.updatePreferences);
router.put('/emergency-contacts', auth, userController.updateEmergencyContacts);

module.exports = router;
