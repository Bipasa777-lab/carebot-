# File: backend/ai-server/app/utils/safety_checker.py

import re

class SafetyChecker:
    def __init__(self):
        self.blocked_keywords = [
            "suicide", "kill myself", "overdose", "violence",
            "bleeding out", "harm", "unalive", "self-harm"
        ]

    def is_safe_query(self, query: str) -> bool:
        query = query.lower()
        for keyword in self.blocked_keywords:
            if keyword in query:
                return False
        return True
