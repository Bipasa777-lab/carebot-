const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const hospitalService = require('../services/hospitalService');

// GET /api/hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json({ hospitals });
  } catch (error) {
    logger.error(`Get all hospitals error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve hospitals' });
  }
};

// GET /api/hospitals/search?specialty=cardiology&city=Delhi
exports.searchHospitals = async (req, res) => {
  try {
    const { specialty, city } = req.query;

    const results = await hospitalService.searchHospitals({ specialty, city });
    res.status(200).json({ hospitals: results });
  } catch (error) {
    logger.error(`Hospital search error: ${error.message}`);
    res.status(500).json({ error: 'Failed to search hospitals' });
  }
};

// POST /api/hospitals/upload (Optional - admin route to upload seed JSON)
exports.uploadHospitalData = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../shared/database/seeds/hospitals.json');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Seed file not found' });
    }

    const rawData = fs.readFileSync(filePath);
    const hospitals = JSON.parse(rawData);

    const result = await hospitalService.bulkInsertHospitals(hospitals);

    res.status(200).json({
      message: 'Hospital data uploaded successfully',
      inserted: result.insertedCount
    });
  } catch (error) {
    logger.error(`Upload hospitals error: ${error.message}`);
    res.status(500).json({ error: 'Failed to upload hospital data' });
  }
};
