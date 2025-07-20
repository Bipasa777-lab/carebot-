# File: backend/ai-server/app/models/medical_prompt.py

from typing import Dict, Optional

class MedicalPromptTemplate:
    """
    Generates a structured prompt for the Meditron AI model based on user query and medical context.
    """

    def __init__(self):
        self.template = (
            "You are WellnessAI, a medical assistant.\n"
            "Provide accurate, evidence-based information to the following medical query.\n\n"
            "=== User Query ===\n"
            "{query}\n\n"
            "=== Context ===\n"
            "{context}\n\n"
            "Instructions:\n"
            "- Keep responses concise but medically accurate.\n"
            "- Use layman's terms when needed.\n"
            "- If the query seems urgent or unsafe, advise contacting a healthcare professional.\n"
            "- Do not make any diagnoses.\n"
        )

    def create_medical_prompt(
        self,
        query: str,
        context: Optional[Dict[str, str]] = None
    ) -> str:
        """
        Create a formatted medical prompt for the LLM.

        Parameters:
        - query (str): The user's medical question or symptom.
        - context (dict, optional): Additional metadata like symptoms, medications, etc.

        Returns:
        - str: A structured prompt for AI processing.
        """
        context_str = self._format_context(context)
        return self.template.format(query=query.strip(), context=context_str)

    def _format_context(self, context: Optional[Dict[str, str]]) -> str:
        """
        Format context dictionary into readable string.

        Parameters:
        - context (dict): Dictionary of medical context.

        Returns:
        - str: Formatted context string.
        """
        if not context:
            return "No additional context provided."

        return "\n".join(f"- {key}: {value}" for key, value in context.items())
