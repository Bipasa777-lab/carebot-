const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const auth = require('../middleware/auth');

// Get all hospitals
router.get('/', auth, hospitalController.getAllHospitals);

// Get a specific hospital
router.get('/:id', auth, hospitalController.getHospitalById);

// Get nearby hospitals
router.get('/nearby', auth, hospitalController.getNearbyHospitals);

// Create new hospital
router.post('/', auth, hospitalController.createHospital);

// Update hospital
router.put('/:id', auth, hospitalController.updateHospital);

// Delete hospital
router.delete('/:id', auth, hospitalController.deleteHospital);

module.exports = router;
