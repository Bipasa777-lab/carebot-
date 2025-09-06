const EmergencyContact = require('../models/EmergencyContact');
const locationService = require('../services/locationServices');
const emergencyService = require('../services/emergencyServices');
const logger = require('../utils/logger');

// POST /api/emergency/trigger
exports.triggerEmergency = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude, reason } = req.body;

    if (!latitude || !longitude || !reason) {
      return res.status(400).json({ error: 'Location and reason are required.' });
    }

    logger.info(`Emergency triggered by user ${userId}: ${reason}`);

    const response = await emergencyService.dispatchAlert({
      userId,
      reason,
      location: { latitude, longitude }
    });

    res.status(200).json({
      message: 'Emergency alert triggered successfully.',
      dispatchResult: response
    });
  } catch (error) {
    logger.error(`Emergency trigger error: ${error.message}`);
    res.status(500).json({ error: 'Failed to trigger emergency alert.' });
  }
};

// GET /api/emergency/nearby-hospitals?lat=xx&lng=yy
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const hospitals = await locationService.findNearbyHospitals(lat, lng);

    res.status(200).json({ hospitals });
  } catch (error) {
    logger.error(`Hospital lookup error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve nearby hospitals.' });
  }
};

// GET /api/emergency/contacts
exports.getEmergencyContacts = async (req, res) => {
  try {
    const userId = req.user.id;

    const contacts = await EmergencyContact.find({ userId });

    res.status(200).json({ contacts });
  } catch (error) {
    logger.error(`Emergency contacts fetch error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch emergency contacts.' });
  }
};
