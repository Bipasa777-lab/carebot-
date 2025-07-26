// ✅ Common hospital emergency codes or internal alerts
// You can map these codes to actions in your chatbot/emergency module

module.exports = {
  CODE_BLUE: {
    label: "Code Blue",
    meaning: "Medical Emergency (e.g., cardiac arrest)",
    action: "Call emergency team immediately"
  },
  CODE_RED: {
    label: "Code Red",
    meaning: "Fire Emergency",
    action: "Activate fire response protocol"
  },
  CODE_ORANGE: {
    label: "Code Orange",
    meaning: "Hazardous Material Spill",
    action: "Evacuate area and call hazmat team"
  },
  CODE_YELLOW: {
    label: "Code Yellow",
    meaning: "External Disaster",
    action: "Prepare triage and emergency services"
  },
  CODE_BLACK: {
    label: "Code Black",
    meaning: "Bomb Threat",
    action: "Follow security protocols and evacuate"
  },
  CODE_PINK: {
    label: "Code Pink",
    meaning: "Infant or Child Abduction",
    action: "Lockdown and alert security"
  }
};
