# File: backend/ai-server/app/__init__.py

from flask import Flask
from flask_cors import CORS

# Initialize Flask App
def create_app():
    app = Flask(__name__)
    
    # Enable CORS for frontend communication
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Import and register blueprints
    from app.routes.chat import chat_bp
    from app.routes.medical_analysis import medical_analysis_bp
    from app.routes.health_check import health_check_bp

    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(medical_analysis_bp, url_prefix="/api")
    app.register_blueprint(health_check_bp, url_prefix="/api")

    return app
