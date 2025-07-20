const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const auth = require('../middleware/auth');

router.post('/trigger', auth, emergencyController.triggerEmergency);
router.get('/nearby-hospitals', auth, emergencyController.getNearbyHospitals);
router.get('/contacts', auth, emergencyController.getEmergencyContacts);

module.exports = router;
