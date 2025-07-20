# File: backend/ai-server/app/routes/chat.py

from flask import Blueprint, request, jsonify
from app.services.meditron_service import MeditronService
from app.utils.safety_checker import SafetyChecker
from app.utils.logger import setup_logger

chat_bp = Blueprint('chat', __name__)
meditron = MeditronService()
safety_checker = SafetyChecker()
logger = setup_logger()

@chat_bp.route('/medical-chat', methods=['POST'])
def chat_with_ai():
    try:
        data = request.get_json()
        query = data.get("message", "")
        user_id = data.get("user_id", "")
        
        if not query:
            return jsonify({"error": "Missing query"}), 400
        
        if not safety_checker.is_safe_query(query):
            return jsonify({
                "error": "Unsafe input",
                "safe_response": "This query seems sensitive. Please consult a medical professional."
            }), 400
        
        response = meditron.generate_response(query, user_id)
        return jsonify(response), 200

    except Exception as e:
        logger.error(f"Chat API error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500
