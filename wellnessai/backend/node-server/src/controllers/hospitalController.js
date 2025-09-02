const Hospital = require('../models/Hospital');
const logger = require('../utils/logger');

// GET /api/hospitals
exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json({ success: true, data: hospitals });
    } catch (error) {
        logger.error('Error fetching hospitals:', error);
        res.status(500).json({ success: false, message: 'Error fetching hospitals' });
    }
};

// GET /api/hospitals/:id
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.json({ success: true, data: hospital });
    } catch (error) {
        logger.error('Error fetching hospital:', error);
        res.status(500).json({ success: false, message: 'Error fetching hospital' });
    }
};

// GET /api/hospitals/nearby
exports.getNearbyHospitals = async (req, res) => {
    try {
        const { latitude, longitude, radius = 5000 } = req.query; // radius in meters, default 5km
        
        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(radius)
                }
            }
        }).limit(10);

        res.json({ success: true, data: hospitals });
    } catch (error) {
        logger.error('Error fetching nearby hospitals:', error);
        res.status(500).json({ success: false, message: 'Error fetching nearby hospitals' });
    }
};

// POST /api/hospitals
exports.createHospital = async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json({ success: true, data: hospital });
    } catch (error) {
        logger.error('Error creating hospital:', error);
        res.status(500).json({ success: false, message: 'Error creating hospital' });
    }
};

// PUT /api/hospitals/:id
exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.json({ success: true, data: hospital });
    } catch (error) {
        logger.error('Error updating hospital:', error);
        res.status(500).json({ success: false, message: 'Error updating hospital' });
    }
};

// DELETE /api/hospitals/:id
exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        logger.error('Error deleting hospital:', error);
        res.status(500).json({ success: false, message: 'Error deleting hospital' });
    }
};
