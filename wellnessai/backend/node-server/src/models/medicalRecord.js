const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relationship: { type: String },
  isPrimary: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
