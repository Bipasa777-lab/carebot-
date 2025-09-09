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

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_BASE_URL = "http://localhost:11434"
MODEL_NAME = "meditron"

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
            raise Exception(f"Ollama API error: {ollama_response.status_code}")
        
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

if __name__ == '__main__':
    print("🚀 Starting WellnessAI Meditron Server...")
    print(f"📡 Ollama URL: {OLLAMA_BASE_URL}")
    print(f"🤖 Model: {MODEL_NAME}")
    print("🌐 Server will run on http://localhost:8000")
    print("📋 Endpoints:")
    print("  - POST /api/medical-chat (WellnessAI format)")
    print("  - POST /api/meditron (Direct format)")
    print("  - GET /health (Health check)")
    
    app.run(host='0.0.0.0', port=8000, debug=True)