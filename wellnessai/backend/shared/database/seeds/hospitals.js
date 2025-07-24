const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodGroup: String,
    allergies: [String],
    chronicConditions: [String]
  },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  preferences: {
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true },
    dataPrivacy: { type: String, default: 'local' }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
