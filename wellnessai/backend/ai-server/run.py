from flask import Flask, request, jsonify
from flask_cors import CORS
from app.services.meditron_service import MeditronService
from app.services.langchain_service import LangChainService
from app.utils.safety_checker import SafetyChecker
from app.utils.logger import setup_logger
import os

app = Flask(__name__)
CORS(app)

# Initialize services
meditron_service = MeditronService()
langchain_service = LangChainService()
safety_checker = SafetyChecker()
logger = setup_logger()

@app.route('/api/medical-chat', methods=['POST'])
def medical_chat():
    try:
        data = request.get_json()
        query = data.get('message')
        user_id = data.get('user_id')
        
        # Safety check
        if not safety_checker.is_safe_query(query):
            return jsonify({
                'error': 'Query contains inappropriate content',
                'safe_response': 'Please consult a healthcare professional for this concern.'
            }), 400
        
        # Process with Meditron
        response = meditron_service.generate_response(query, user_id)
        
        return jsonify({
            'response': response,
            'confidence': response.get('confidence', 0.8),
            'disclaimer': 'This is AI-generated advice. Please consult a healthcare professional.'
        })
        
    except Exception as e:
        logger.error(f"Medical chat error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)