# File: backend/ai-server/app/models/chat_session.py

from datetime import datetime
from typing import List, Dict

class ChatSession:
    """
    A class to represent and manage a chat session between the user and the AI assistant.
    """

    def __init__(self, user_id: str):
        """
        Initialize a new ChatSession.

        Parameters:
        - user_id (str): The ID of the user.
        """
        self.user_id = user_id
        self.history: List[Dict[str, str]] = []
        self.session_id = self._generate_session_id()
        self.created_at = datetime.utcnow().isoformat()

    def _generate_session_id(self) -> str:
        """
        Generate a unique session ID using timestamp and user_id.

        Returns:
        - str: A unique session ID.
        """
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
        return f"{self.user_id}-{timestamp}"

    def add_message(self, role: str, message: str):
        """
        Add a message to the session history.

        Parameters:
        - role (str): Either 'user' or 'ai'.
        - message (str): The message content.
        """
        if role not in ["user", "ai"]:
            raise ValueError("Role must be 'user' or 'ai'")

        self.history.append({
            "role": role,
            "message": message,
            "timestamp": datetime.utcnow().isoformat()
        })

    def get_history(self) -> List[Dict[str, str]]:
        """
        Retrieve the full chat history.

        Returns:
        - List[Dict[str, str]]: The chat history.
        """
        return self.history

    def clear_history(self):
        """
        Clear all messages from the session history.
        """
        self.history = []
