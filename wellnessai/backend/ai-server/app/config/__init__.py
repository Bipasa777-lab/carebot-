"""
WellnessAI Configuration Module
Centralizes all configuration settings for the AI server
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Base configuration class"""
    
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'wellness-ai-secret-key-2024')
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    # AI Model Configuration
    OLLAMA_HOST = os.getenv('OLLAMA_HOST', 'http://localhost:11434')
    MEDITRON_MODEL_NAME = os.getenv('MEDITRON_MODEL_NAME', 'meditron')
    MODEL_TEMPERATURE = float(os.getenv('MODEL_TEMPERATURE', '0.3'))
    MAX_TOKEN_LENGTH = int(os.getenv('MAX_TOKEN_LENGTH', '2048'))
    MAX_RETRIES = int(os.getenv('MAX_RETRIES', '3'))
    
    # Security Configuration
    AI_SERVER_TOKEN = os.getenv('AI_SERVER_TOKEN', 'secure-ai-token-2024')
    ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5000').split(',')
    RATE_LIMIT = os.getenv('RATE_LIMIT', '100/hour')
    
    # Logging Configuration
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = os.getenv('LOG_FILE', 'logs/ai_server.log')
    LOG_MAX_BYTES = int(os.getenv('LOG_MAX_BYTES', '10485760'))  # 10MB
    LOG_BACKUP_COUNT = int(os.getenv('LOG_BACKUP_COUNT', '5'))
    
    # Medical AI Configuration
    ENABLE_SAFETY_CHECKS = os.getenv('ENABLE_SAFETY_CHECKS', 'True').lower() == 'true'
    CONFIDENCE_THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', '0.7'))
    MEDICAL_DISCLAIMER = os.getenv('MEDICAL_DISCLAIMER', 
        'This information is for educational purposes only and should not replace professional medical advice.')
    
    # LangChain Configuration
    LANGCHAIN_VERBOSE = os.getenv('LANGCHAIN_VERBOSE', 'False').lower() == 'true'
    LANGCHAIN_CACHE_DIR = os.getenv('LANGCHAIN_CACHE_DIR', '.langchain_cache')
    
    # Response Configuration
    DEFAULT_RESPONSE_TIMEOUT = int(os.getenv('DEFAULT_RESPONSE_TIMEOUT', '30'))
    MAX_RESPONSE_LENGTH = int(os.getenv('MAX_RESPONSE_LENGTH', '1000'))
    
    # Emergency Keywords
    EMERGENCY_KEYWORDS = [
        'chest pain', 'heart attack', 'difficulty breathing', 'unconscious',
        'severe bleeding', 'overdose', 'suicide', 'emergency', 'urgent',
        'can\'t breathe', 'stroke', 'seizure', 'allergic reaction'
    ]
    
    # High Risk Keywords  
    HIGH_RISK_KEYWORDS = [
        'severe pain', 'blood', 'fever', 'infection', 'accident',
        'injury', 'broken', 'fractured', 'swollen', 'rash'
    ]

class DevelopmentConfig(Config):
    """Development environment configuration"""
    DEBUG = True
    LOG_LEVEL = 'DEBUG'
    LANGCHAIN_VERBOSE = True

class ProductionConfig(Config):
    """Production environment configuration"""
    DEBUG = False
    LOG_LEVEL = 'WARNING'
    LANGCHAIN_VERBOSE = False
    # Enhanced security for production
    ENABLE_SAFETY_CHECKS = True
    CONFIDENCE_THRESHOLD = 0.8

class TestingConfig(Config):
    """Testing environment configuration"""
    DEBUG = True
    TESTING = True
    LOG_LEVEL = 'DEBUG'
    # Use mock models for testing
    MEDITRON_MODEL_NAME = 'mock-meditron'

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Get configuration based on environment"""
    env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])

# Export commonly used configuration
current_config = get_config()