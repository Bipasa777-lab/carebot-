import os

class AIConfig:
    # General AI Server Settings
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
    
    # Model Settings
    MODEL_NAME = os.getenv('MODEL_NAME', 'meditron')
    OLLAMA_HOST = os.getenv('OLLAMA_HOST', 'http://localhost:11434')
    MEDITRON_MODEL_PATH = os.getenv('MEDITRON_MODEL_PATH', '/models/meditron')
    
    # Language Model Parameters
    MAX_TOKEN_LENGTH = int(os.getenv('MAX_TOKEN_LENGTH', 2048))
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.3))
    MAX_RETRIES = int(os.getenv('MAX_RETRIES', 3))
    
    # Safety Config
    ENABLE_SAFETY_CHECK = True
    INAPPROPRIATE_KEYWORDS = [
        'suicide', 'kill myself', 'self harm', 
        'violence', 'murder', 'overdose'
    ]
    
    # Allowed Origins for CORS
    ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')

    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = os.getenv('LOG_FILE', 'logs/ai_server.log')
    
    # Security
    AI_SERVER_TOKEN = os.getenv('AI_SERVER_TOKEN', 'your-secure-token-here')


# Global config instance
config = AIConfig()
