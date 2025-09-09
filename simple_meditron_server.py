#!/usr/bin/env python3
"""
Simple Meditron Flask Server - WellnessAI Integration
This is a simplified version that works with the installed dependencies.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration (overridable via environment variables)
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
MODEL_NAME = os.getenv("MEDITRON_MODEL", "meditron")


def ensure_ollama_and_model():
    """Ensure Ollama is reachable and the model is available; pull if missing."""
    try:
        logger.info(f"Checking Ollama at {OLLAMA_BASE_URL}...")
        tags_response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=10)
        tags_response.raise_for_status()
        tags = tags_response.json().get("models", [])
        model_names = {m.get("name", "") for m in tags}
        if MODEL_NAME not in model_names and f"{MODEL_NAME}:latest" not in model_names:
            logger.info(f"Model '{MODEL_NAME}' not found. Pulling from registry...")
            pull_response = requests.post(
                f"{OLLAMA_BASE_URL}/api/pull",
                json={"name": MODEL_NAME},
                timeout=60,
            )
            pull_response.raise_for_status()
            logger.info("Model pull initiated/completed successfully.")
        else:
            logger.info(f"Model '{MODEL_NAME}' is available.")
        return True
    except Exception as e:
        logger.error(f"Ollama connection failed: {e}")
        logger.error("Please ensure Ollama is running: ollama serve")
        logger.error(f"Then pull the model: ollama pull {MODEL_NAME}")
        return False

@app.route('/api/medical-chat', methods=['POST'])
def medical_chat():
    """Medical chat endpoint using Meditron"""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        user_id = data.get('user_id', 'anonymous')
        
        logger.info(f"Medical query from {user_id}: {user_message[:50]}...")
        
        # Check if Ollama is available first
        try:
            ollama_check = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
            if ollama_check.status_code != 200:
                raise Exception("Ollama is not responding")
        except Exception as e:
            logger.error(f"Ollama connection failed: {e}")
            return jsonify({
                'error': 'Medical AI service is currently unavailable',
                'fallback': 'Please ensure Ollama is running and try again. For immediate medical concerns, please consult a healthcare professional.',
                'details': 'Ollama server is not accessible. Please run: ollama serve',
                'timestamp': datetime.utcnow().isoformat()
            }), 503
        
        # Call Meditron via Ollama API
        ollama_response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={
                'model': MODEL_NAME,
                'prompt': f"As a medical AI assistant, please provide helpful information about: {user_message}",
                'stream': False
            },
            timeout=30
        )
        
        if ollama_response.status_code != 200:
            error_msg = f"Ollama API error: {ollama_response.status_code}"
            if ollama_response.status_code == 404:
                error_msg += f" - Model '{MODEL_NAME}' not found. Please run: ollama pull {MODEL_NAME}"
            raise Exception(error_msg)
        
        result = ollama_response.json()
        
        response_data = {
            'response': {
                'message': result.get('response', '').strip(),
                'formatted': True,
                'medical_grade': True
            },
            'confidence': 0.85,
            'source': 'meditron',
            'timestamp': datetime.utcnow().isoformat(),
            'disclaimer': 'This information is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for medical concerns.',
            'user_id': user_id
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Medical chat error: {str(e)}")
        return jsonify({
            'error': 'Unable to process medical query',
            'fallback': 'Please consult a healthcare professional for this concern.',
            'details': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

@app.route('/api/meditron', methods=['POST'])
def meditron_direct():
    """Direct Meditron endpoint (similar to Node.js version)"""
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt is required'}), 400
        
        prompt = data['prompt']
        
        # Call Meditron directly
        ollama_response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={
                'model': MODEL_NAME,
                'prompt': prompt,
                'stream': False
            },
            timeout=30
        )
        
        if ollama_response.status_code != 200:
            raise Exception(f"Ollama API error: {ollama_response.status_code}")
        
        result = ollama_response.json()
        
        return jsonify({
            'success': True,
            'response': result.get('response', '').strip(),
            'model': MODEL_NAME,
            'timestamp': datetime.utcnow().isoformat(),
            'disclaimer': 'This AI response is for informational purposes only and does not substitute professional medical advice. Please consult a licensed healthcare provider.'
        })
        
    except Exception as e:
        logger.error(f"Meditron direct error: {str(e)}")
        return jsonify({
            'error': 'Failed to get Meditron response',
            'message': str(e),
            'fallback': 'Please try again later or consult a healthcare professional directly.'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test Ollama connection
        health_response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        ollama_status = "healthy" if health_response.status_code == 200 else "unhealthy"
        
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'services': {
                'flask': 'healthy',
                'ollama': ollama_status,
                'meditron': ollama_status
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500


# Remove deprecated before_first_request - we'll call ensure_ollama_and_model on startup instead

if __name__ == '__main__':
    print("🚀 Starting CareBot Medical AI Server...")
    print(f"📡 Ollama URL: {OLLAMA_BASE_URL}")
    print(f"🤖 Model: {MODEL_NAME}")
    print("🌐 Server will run on http://localhost:8000")
    print("📋 Endpoints:")
    print("  - POST /api/medical-chat (Medical chat with Ollama)")
    print("  - POST /api/meditron (Direct Ollama access)")
    print("  - GET /health (Health check)")
    print("=" * 50)
    
    # Ensure connectivity and model availability at startup
    print("🔍 Checking Ollama connection...")
    ollama_ready = ensure_ollama_and_model()
    
    if ollama_ready:
        print("✅ Ollama is ready! Medical AI chat is available.")
    else:
        print("⚠️  Ollama not ready. Medical AI chat will show error messages.")
        print("   To fix: Run 'ollama serve' and 'ollama pull meditron'")
    
    print("=" * 50)
    print("🌐 Starting server...")
    app.run(host='0.0.0.0', port=8000, debug=True)