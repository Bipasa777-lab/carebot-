import logging
import requests
from datetime import datetime
from app.config import model_settings

settings = model_settings.settings

class OllamaService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.base_url = settings.OLLAMA_HOST.rstrip('/')
        self.model_name = settings.MODEL_NAME
        self.timeout = settings.TIMEOUT_SECONDS

    def chat(self, user_message: str, context_messages=None):
        """
        Sends a chat request to the Ollama model and returns the response.
        """
        context_messages = context_messages or []
        try:
            # Construct message payload
            payload = {
                "model": self.model_name,
                "messages": [
                    {
                        "role": "system",
                        "content": self._get_system_prompt()
                    },
                    *context_messages,
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]
            }

            response = requests.post(
                f"{self.base_url}/api/chat",
                json=payload,
                timeout=self.timeout
            )

            response.raise_for_status()
            result = response.json()

            return {
                "response": {
                    "message": result.get("message", {}).get("content", "").strip(),
                    "formatted": True
                },
                "source": "ollama",
                "timestamp": datetime.utcnow().isoformat(),
                "confidence": 0.75,
                "disclaimer": self._get_disclaimer()
            }

        except requests.RequestException as e:
            self.logger.error(f"Ollama chat request failed: {str(e)}")
            return self._fallback_response()

    def _get_system_prompt(self):
        return (
            "You are WellnessAI, a trusted medical assistant. Provide helpful, "
            "safe, and medically accurate responses. Avoid giving emergency or life-critical advice. "
            "Always include a disclaimer to consult a healthcare provider."
        )

    def _get_disclaimer(self):
        return (
            "This AI response is for informational purposes only and does not substitute "
            "professional medical advice. Please consult a licensed healthcare provider."
        )

    def _fallback_response(self):
        return {
            "response": {
                "message": (
                    "I'm currently unable to provide a reliable response. Please try again later "
                    "or contact a healthcare professional."
                ),
                "formatted": True
            },
            "source": "fallback",
            "confidence": 0.0,
            "error": True
        }
