# File: backend/ai-server/app/routes/__init__.py

from flask import Blueprint
from .chat import chat_bp
from .medical_analysis import medical_analysis_bp
from .health_check import health_check_bp

def register_routes(app):
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(medical_analysis_bp, url_prefix="/api")
    app.register_blueprint(health_check_bp, url_prefix="/api")
