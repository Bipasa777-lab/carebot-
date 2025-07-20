const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  messages: [{
    sender: { type: String, enum: ['user', 'ai'], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: {
      confidence: Number,
      riskLevel: String,
      aiModel: String,
      processingTime: Number
    }
  }],
  medicalContext: {
    symptoms: [String],
    urgency: { type: String, enum: ['low', 'medium', 'high'] },
    category: String,
    followUpRequired: Boolean
  },
  privacy: {
    encrypted: { type: Boolean, default: true },
    localOnly: { type: Boolean, default: true },
    retentionDays: { type: Number, default: 30 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);