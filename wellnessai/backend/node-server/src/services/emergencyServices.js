class EmergencyService {
  async getEmergencyInstructions(condition) {
    const instructionsMap = {
      "chest pain": "Call emergency services immediately and rest in a comfortable position.",
      "bleeding": "Apply firm pressure on the wound and seek urgent medical help.",
      "unconscious": "Check breathing. If absent, start CPR and call an ambulance.",
    };

    return instructionsMap[condition.toLowerCase()] || "Contact emergency services for guidance.";
  }

  async logEmergencyEvent(userId, location, condition) {
    // Example logger - extend with DB if needed
    console.log(`[EMERGENCY] User ${userId} reported: ${condition} at (${location.lat}, ${location.lng})`);
  }
}

module.exports = new EmergencyService();
