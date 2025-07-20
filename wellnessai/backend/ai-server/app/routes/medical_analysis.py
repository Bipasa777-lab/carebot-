# File: backend/ai-server/app/routes/medical_analysis.py

from flask import Blueprint, request, jsonify
from app.services.medical_validator import MedicalValidator
from app.utils.logger import setup_logger

medical_analysis_bp = Blueprint('medical_analysis', __name__)
validator = MedicalValidator()
logger = setup_logger()

@medical_analysis_bp.route('/validate-query', methods=['POST'])
def validate_medical_query():
    try:
        data = request.get_json()
        query = data.get("query", "")
        if not query:
            return jsonify({"error": "Missing query"}), 400

        validation = validator.validate(query)
        return jsonify(validation), 200
    except Exception as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500
