"""
Service Layer Initialization for WellnessAI AI Server

This package handles all the AI-related business logic, such as:
- Medical LLM orchestration (Meditron, LangChain)
- Prompt engineering and safety checks
- Response formatting and validation
"""

from .meditron_service import MeditronService
from .langchain_service import LangChainService
from .ollama_service import OllamaService
from .medical_validator import MedicalValidator

# Initialize core services
meditron_service = MeditronService()
langchain_service = LangChainService()
ollama_service = OllamaService()
medical_validator = MedicalValidator()

__all__ = [
    "meditron_service",
    "langchain_service",
    "ollama_service",
    "medical_validator"
]
