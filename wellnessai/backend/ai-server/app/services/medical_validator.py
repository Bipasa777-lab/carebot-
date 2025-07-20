import re
import logging
from datetime import datetime

class MedicalValidator:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

        # Keywords that help identify medical intent
        self.medical_keywords = [
            "symptom", "fever", "pain", "cough", "treatment", "diagnosis", "infection",
            "headache", "diabetes", "hypertension", "asthma", "blood pressure",
            "medication", "side effects", "dose", "rash", "vomiting", "nausea"
        ]

        # Keywords that might signal a medical emergency
        self.emergency_keywords = [
            "chest pain", "difficulty breathing", "severe bleeding", "unconscious",
            "heart attack", "stroke", "loss of vision", "cannot breathe", "seizure"
        ]

    def validate(self, query: str) -> dict:
        query_lower = query.lower()

        is_medical = any(keyword in query_lower for keyword in self.medical_keywords)
        is_emergency = any(phrase in query_lower for phrase in self.emergency_keywords)

        risk_level = self._assess_risk_level(query_lower)
        self.logger.debug(f"Validation result - is_medical: {is_medical}, risk_level: {risk_level}")

        return {
            "isValid": is_medical,
            "isMedical": is_medical,
            "isEmergency": is_emergency,
            "riskLevel": risk_level,
            "timestamp": datetime.utcnow().isoformat()
        }

    def _assess_risk_level(self, query: str) -> str:
        # Determine the severity of the query
        if any(phrase in query for phrase in self.emergency_keywords):
            return "HIGH"
        elif any(keyword in query for keyword in ["pain", "bleeding", "vomiting", "dizziness", "infection"]):
            return "MEDIUM"
        else:
            return "LOW"

    def extract_symptoms(self, query: str) -> list:
        # Extract simple symptoms based on keywords
        symptoms = [keyword for keyword in self.medical_keywords if keyword in query.lower()]
        return list(set(symptoms))
