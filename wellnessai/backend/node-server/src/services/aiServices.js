const axios = require('axios');
const config = require('../config/ai');

class AIService {
  constructor() {
    this.flaskServerUrl = process.env.AI_SERVER_URL || 'http://localhost:8000';
  }

  async getMedicalResponse(message, userId, context = {}) {
    try {
      const response = await axios.post(`${this.flaskServerUrl}/api/medical-chat`, {
        message,
        user_id: userId,
        context,
        timestamp: new Date().toISOString()
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AI_SERVER_TOKEN}`
        }
      });

      return {
        success: true,
        data: response.data,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('AI Service Error:', error.message);
      return {
        success: false,
        error: 'Failed to get AI response',
        fallback: 'I apologize, but I cannot process your request right now. Please try again or contact a healthcare professional.'
      };
    }
  }

  async validateMedicalQuery(query) {
    // Basic validation logic
    const medicalKeywords = ['symptom', 'pain', 'medication', 'treatment', 'diagnosis'];
    const hasKeywords = medicalKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
    
    return {
      isValid: hasKeywords,
      isMedical: hasKeywords,
      riskLevel: this.assessRiskLevel(query)
    };
  }

  assessRiskLevel(query) {
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'unconscious', 'bleeding'];
    const hasEmergency = emergencyKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
    
    return hasEmergency ? 'HIGH' : 'LOW';
  }
}

module.exports = new AIService();