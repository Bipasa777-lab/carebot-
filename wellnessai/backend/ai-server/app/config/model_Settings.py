import os

class ModelSettings:
    """
    Configuration for AI model parameters, useful for advanced tuning and experimentation.
    """

    # Model Identity
    MODEL_NAME = os.getenv('MODEL_NAME', 'meditron')
    MODEL_TYPE = os.getenv('MODEL_TYPE', 'ollama')  # Options: 'ollama', 'openai', 'huggingface'

    # Ollama Settings
    OLLAMA_HOST = os.getenv('OLLAMA_HOST', 'http://localhost:11434')
    MEDITRON_MODEL_PATH = os.getenv('MEDITRON_MODEL_PATH', '/models/meditron')

    # Inference Settings
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.3))
    MAX_TOKEN_LENGTH = int(os.getenv('MAX_TOKEN_LENGTH', 2048))
    TOP_P = float(os.getenv('TOP_P', 0.95))
    FREQUENCY_PENALTY = float(os.getenv('FREQUENCY_PENALTY', 0.0))
    PRESENCE_PENALTY = float(os.getenv('PRESENCE_PENALTY', 0.0))

    # Retry & Timeout Logic
    MAX_RETRIES = int(os.getenv('MAX_RETRIES', 3))
    TIMEOUT_SECONDS = int(os.getenv('TIMEOUT_SECONDS', 30))

    # LangChain Options
    LANGCHAIN_VERBOSE = os.getenv('LANGCHAIN_VERBOSE', 'False') == 'True'
    ENABLE_CACHING = os.getenv('ENABLE_CACHING', 'True') == 'True'


# Global settings instance
settings = ModelSettings()
