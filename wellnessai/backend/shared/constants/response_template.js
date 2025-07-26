// ✅ Predefined response templates used by your chatbot
// Helps keep responses consistent and easily maintainable

module.exports = {
  GREETING: "👋 Hello! I’m WellnessAI, your trusted medical assistant. How can I help you today?",
  
  GENERIC_ERROR: "⚠️ Oops! Something went wrong on my end. Please try again later.",

  EMERGENCY_ALERT: "🚨 If this is a medical emergency, please call your local emergency number immediately.",

  NO_MATCH_FOUND: "🤔 I’m not sure about that symptom. Could you please provide more details?",

  HISTORY_SAVED: "✅ Your symptom and advice have been saved to your medical history.",

  HOSPITAL_SUGGESTION: (name, distance) =>
    `🏥 Nearest hospital suggestion: ${name}, approximately ${distance} away.`,

  FOLLOW_UP_QUESTION: "❓ Could you please tell me more about your symptoms for better assistance?",

  THANK_YOU: "🙏 Thank you for using WellnessAI. Take care and stay healthy!",

  MEDICATION_REMINDER: (medName, time) =>
    `💊 Reminder: It’s time to take your medication **${medName}** at ${time}.`
};
