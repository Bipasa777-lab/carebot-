const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const auth = require('../middleware/auth');

router.get('/', auth, hospitalController.getAllHospitals);
router.get('/search', auth, hospitalController.searchHospitals);
router.post('/upload', auth, hospitalController.uploadHospitalData); // Optional: Admin only

module.exports = router;
