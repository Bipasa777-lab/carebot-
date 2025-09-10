#!/usr/bin/env python3
"""
CareBot Chat Server with Ollama Meditron Integration
This provides intelligent medical responses using the Meditron model via Ollama
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime
import random
import requests
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
MODEL_NAME = os.getenv("MEDITRON_MODEL", "meditron")

# Enhanced fallback responses for when Ollama is not available
MEDICAL_RESPONSES = {
    "headache": [
        "Headaches can have various causes including tension, dehydration, lack of sleep, or stress. Try these immediate relief measures: rest in a quiet, dark room, apply a cold compress to your forehead, stay hydrated, and consider over-the-counter pain relief like ibuprofen or acetaminophen if appropriate. If headaches persist for more than 2 days, worsen suddenly, or are accompanied by fever, vision changes, or neck stiffness, please consult a healthcare professional immediately.",
        "For headache relief, ensure you're well-hydrated (drink plenty of water), get adequate sleep (7-9 hours), and avoid triggers like bright lights, loud noises, or strong smells. Gentle neck and shoulder stretches can help with tension headaches. If the headache is severe, sudden, or accompanied by other symptoms like nausea, vomiting, or sensitivity to light, seek medical attention immediately as these could indicate a more serious condition."
    ],
    "fatigue": [
        "Low energy can be caused by many factors including stress, poor sleep quality, nutritional deficiencies (especially iron, B12, or vitamin D), dehydration, or underlying health conditions. Try these steps: maintain a regular sleep schedule (7-9 hours), eat balanced meals with protein and complex carbohydrates, stay hydrated, engage in light physical activity, and manage stress through relaxation techniques. If fatigue persists for more than 2 weeks or is accompanied by other symptoms, consider consulting a healthcare provider for evaluation.",
        "To boost energy levels, focus on: getting adequate sleep (7-9 hours), eating regular meals with protein and complex carbohydrates, staying hydrated (8-10 glasses of water daily), engaging in regular physical activity (even light walking), managing stress through meditation or deep breathing, and avoiding excessive caffeine and sugar which can cause energy crashes. Persistent fatigue may indicate an underlying condition like anemia, thyroid issues, or depression that requires medical evaluation."
    ],
    "energy": [
        "To improve energy levels, focus on getting adequate sleep (7-9 hours), maintaining a balanced diet with regular meals, staying hydrated (8-10 glasses of water daily), and engaging in regular physical activity (even light walking). Avoid excessive caffeine and sugar which can cause energy crashes. Consider checking for nutritional deficiencies like iron, B12, or vitamin D. If energy issues persist for more than 2 weeks, consult a healthcare professional.",
        "Low energy often relates to lifestyle factors. Ensure you're getting enough sleep, eating nutritious foods (especially iron-rich foods), drinking plenty of water, managing stress effectively, and getting regular exercise. Avoid skipping meals and limit processed foods. If energy problems persist despite lifestyle changes, it may indicate an underlying condition like anemia, thyroid dysfunction, or depression that requires medical evaluation."
    ],
    "pain": [
        "Pain management should be approached carefully. For mild pain, try rest, ice/heat therapy (ice for acute injuries, heat for muscle tension), gentle stretching, and over-the-counter pain relief if appropriate. For persistent or severe pain, please consult a healthcare professional for proper evaluation and treatment. Never ignore severe, sudden, or worsening pain as it may indicate a serious condition requiring immediate medical attention.",
        "If you're experiencing pain, it's important to identify the cause and location. Rest the affected area, apply ice for acute injuries or heat for muscle tension, and consider over-the-counter pain relief. Persistent pain requires medical evaluation to determine the appropriate treatment plan. Seek immediate medical attention for severe pain, pain with fever, or pain that worsens suddenly."
    ],
    "fever": [
        "A mild fever (100.4°F/38°C or below) can be managed at home with rest, plenty of fluids, and over-the-counter fever reducers like acetaminophen or ibuprofen. Monitor your temperature regularly and watch for other symptoms. Seek medical attention if: fever is above 102°F/39°C, fever lasts more than 3 days, you have difficulty breathing, severe headache, neck stiffness, or rash. For infants under 3 months, any fever requires immediate medical attention.",
        "For fever management: rest, stay hydrated with water and electrolyte drinks, use fever reducers like acetaminophen or ibuprofen as directed, wear light clothing, and use cool compresses. Monitor for concerning symptoms like difficulty breathing, severe headache, neck stiffness, or rash. Seek medical care if fever is high (above 102°F), persists more than 3 days, or is accompanied by other serious symptoms."
    ],
    "asthma": [
        "If you're experiencing asthma symptoms (wheezing, shortness of breath, chest tightness, coughing), use your rescue inhaler as prescribed. Sit upright, try to stay calm, and practice slow, deep breathing. If symptoms don't improve within 15 minutes or worsen, seek immediate medical attention. For asthma management: avoid triggers (allergens, smoke, cold air), take prescribed medications regularly, use a peak flow meter to monitor lung function, and have an asthma action plan. Always carry your rescue inhaler.",
        "Asthma management involves: using your prescribed medications as directed, avoiding known triggers (pollen, dust, smoke, cold air), monitoring symptoms with a peak flow meter, having an asthma action plan, and carrying your rescue inhaler at all times. During an asthma attack: use your rescue inhaler, sit upright, stay calm, and practice slow breathing. If symptoms don't improve or worsen, seek immediate medical attention. Regular check-ups with your healthcare provider are essential for asthma control."
    ],
    "medicine": [
        "For medication-related questions, it's important to consult with your healthcare provider or pharmacist. They can provide specific information about dosage, side effects, interactions, and proper usage. Never stop taking prescribed medications without consulting your doctor. If you experience concerning side effects, contact your healthcare provider immediately. Always read medication labels carefully and follow instructions exactly as prescribed.",
        "Medication safety is crucial. Always follow your doctor's instructions exactly, read labels carefully, and never share medications. Common side effects vary by medication type - consult your pharmacist or healthcare provider for specific information. If you experience severe side effects, allergic reactions, or have concerns about your medications, contact your healthcare provider immediately. Keep a list of all medications you're taking for medical appointments."
    ],
    "side effects": [
        "Side effects vary greatly depending on the specific medication. Common side effects may include nausea, dizziness, drowsiness, or mild stomach upset. More serious side effects could include allergic reactions, severe nausea, difficulty breathing, or unusual bleeding. Always read the medication information leaflet and discuss any concerns with your healthcare provider or pharmacist. If you experience severe or concerning side effects, stop taking the medication and contact your healthcare provider immediately.",
        "Medication side effects depend on the specific drug. Always read the patient information leaflet that comes with your medication. Common side effects are usually mild and temporary, but serious side effects require immediate medical attention. If you experience severe allergic reactions (rash, difficulty breathing, swelling), unusual bleeding, severe nausea, or any concerning symptoms, stop the medication and contact your healthcare provider or emergency services immediately."
    ],
    "bp": [
        "Blood pressure management involves lifestyle changes and medication adherence. Take your BP medications exactly as prescribed by your doctor. Lifestyle modifications include: reducing sodium intake, maintaining a healthy weight, regular exercise (30 minutes most days), limiting alcohol, quitting smoking, and managing stress. Monitor your blood pressure regularly and keep track of readings. Never stop BP medications without consulting your doctor, as this can cause dangerous blood pressure spikes.",
        "For blood pressure control: take medications exactly as prescribed, maintain a low-sodium diet, exercise regularly, maintain a healthy weight, limit alcohol consumption, quit smoking, manage stress through relaxation techniques, and monitor your blood pressure regularly. High blood pressure often has no symptoms, so regular monitoring is crucial. If you miss a dose, don't double up - take the next scheduled dose. Always consult your doctor before making any changes to your BP medication regimen."
    ],
    "blood pressure": [
        "Blood pressure management requires a comprehensive approach: take medications as prescribed, follow a low-sodium diet (less than 2,300mg daily), engage in regular physical activity (150 minutes weekly), maintain a healthy weight, limit alcohol (1 drink daily for women, 2 for men), quit smoking, manage stress, and monitor BP regularly. Never stop medications without doctor approval. If you miss a dose, don't double up - take the next scheduled dose.",
        "Effective blood pressure control involves: medication adherence, dietary changes (DASH diet), regular exercise, weight management, stress reduction, and regular monitoring. Lifestyle modifications can significantly reduce BP: reduce sodium to under 2,300mg daily, increase potassium-rich foods, exercise regularly, maintain healthy weight, limit alcohol, quit smoking, and practice stress management. Regular check-ups with your healthcare provider are essential for monitoring and adjusting treatment."
    ]
}

def check_ollama_availability():
    """Check if Ollama is running and Meditron model is available"""
    try:
        # Check if Ollama service is running
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        if response.status_code != 200:
            return False, "Ollama service is not running"
        
        # Check if Meditron model is available
        models = response.json().get("models", [])
        model_names = [m.get("name", "") for m in models]
        
        if MODEL_NAME not in model_names and f"{MODEL_NAME}:latest" not in model_names:
            return False, f"Meditron model not found. Please run: ollama pull {MODEL_NAME}"
        
        return True, "Ollama and Meditron are ready"
        
    except requests.exceptions.RequestException as e:
        return False, f"Ollama connection failed: {str(e)}"

def get_meditron_response(user_message, user_id="anonymous"):
    """Get response from Meditron model via Ollama"""
    try:
        # Create a medical-focused prompt
        medical_prompt = f"""As a medical AI assistant, please provide helpful and accurate information about the following health concern. Be informative but always remind the user to consult healthcare professionals for serious conditions.

User's question: {user_message}

Please provide:
1. Relevant medical information
2. General advice or recommendations
3. When to seek professional medical help
4. Important disclaimers about not replacing professional medical advice

Keep the response clear, helpful, and medically responsible."""

        # Call Ollama API
        ollama_response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={
                'model': MODEL_NAME,
                'prompt': medical_prompt,
                'stream': False,
                'options': {
                    'temperature': 0.7,
                    'top_p': 0.9,
                    'top_k': 40,
                    'num_predict': 512
                }
            },
            timeout=60
        )
        
        if ollama_response.status_code != 200:
            raise Exception(f"Ollama API error: {ollama_response.status_code}")
        
        result = ollama_response.json()
        return result.get('response', '').strip()
        
    except Exception as e:
        logger.error(f"Meditron API error: {str(e)}")
        raise e

def get_fallback_response(user_message):
    """Generate an intelligent fallback response when Ollama is not available"""
    message_lower = user_message.lower()
    
    # Check for specific medical conditions and provide detailed responses
    for keyword, responses in MEDICAL_RESPONSES.items():
        if keyword in message_lower:
            return random.choice(responses)
    
    # Check for general medical terms and provide contextual responses
    if any(word in message_lower for word in ['symptom', 'condition', 'disease', 'illness', 'sick']):
        return "I understand you're concerned about a medical condition. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Describe your symptoms clearly to your doctor, including when they started, their severity, and any factors that make them better or worse. For urgent symptoms like chest pain, difficulty breathing, or severe pain, seek immediate medical attention."
    
    if any(word in message_lower for word in ['medication', 'drug', 'pill', 'tablet', 'prescription']):
        return "For medication-related questions, it's essential to consult with your healthcare provider or pharmacist. They can provide specific information about dosage, side effects, drug interactions, and proper usage. Never stop taking prescribed medications without consulting your doctor. If you experience concerning side effects, contact your healthcare provider immediately. Always read medication labels carefully and follow instructions exactly as prescribed."
    
    if any(word in message_lower for word in ['emergency', 'urgent', 'severe', 'critical', 'immediate']):
        return "If you're experiencing a medical emergency with symptoms like chest pain, difficulty breathing, severe bleeding, loss of consciousness, or signs of stroke (facial drooping, arm weakness, speech difficulties), call emergency services immediately (911 or your local emergency number). Do not delay seeking medical attention for potentially life-threatening conditions."
    
    if any(word in message_lower for word in ['prevention', 'prevent', 'avoid', 'healthy', 'wellness']):
        return "Preventive healthcare is crucial for maintaining good health. Key strategies include: regular exercise (150 minutes weekly), balanced nutrition with fruits and vegetables, adequate sleep (7-9 hours), stress management, regular health check-ups, vaccinations, avoiding smoking and excessive alcohol, and maintaining a healthy weight. Consult your healthcare provider for personalized prevention strategies based on your age, family history, and risk factors."
    
    # Default comprehensive response for general health questions
    return "Thank you for your health question. While I can provide general information, it's important to remember that this is not a substitute for professional medical advice. For specific health concerns, symptoms, or if you're experiencing a medical emergency, please consult with a qualified healthcare provider or contact emergency services immediately. Always seek professional medical advice for proper diagnosis and treatment of any health condition."

@app.route('/api/medical-chat', methods=['POST'])
def medical_chat():
    """Medical chat endpoint with Ollama Meditron integration"""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        user_id = data.get('user_id', 'anonymous')
        
        logger.info(f"Medical query from {user_id}: {user_message[:50]}...")
        
        # Check if Ollama is available
        ollama_available, ollama_status = check_ollama_availability()
        
        if ollama_available:
            try:
                # Use Meditron for intelligent response
                response_text = get_meditron_response(user_message, user_id)
                source = 'meditron-ollama'
                confidence = 0.95
                logger.info("Using Meditron model for response")
            except Exception as e:
                logger.warning(f"Meditron failed, using fallback: {str(e)}")
                response_text = get_fallback_response(user_message)
                source = 'fallback-medical-assistant'
                confidence = 0.75
        else:
            # Use fallback responses
            response_text = get_fallback_response(user_message)
            source = 'fallback-medical-assistant'
            confidence = 0.75
            logger.info(f"Ollama not available ({ollama_status}), using fallback responses")
        
        response_data = {
            'response': {
                'message': response_text,
                'formatted': True,
                'medical_grade': True
            },
            'confidence': confidence,
            'source': source,
            'ollama_status': ollama_status,
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

@app.route('/api/chat/message', methods=['POST'])
def chat_message():
    """Alternative chat endpoint for Node.js compatibility"""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        session_id = data.get('sessionId', 'default')
        
        logger.info(f"Chat message from session {session_id}: {user_message[:50]}...")
        
        # Generate response
        response_text = get_medical_response(user_message)
        
        response_data = {
            'success': True,
            'message': response_text,
            'sessionId': session_id,
            'timestamp': datetime.utcnow().isoformat(),
            'disclaimer': 'This information is for educational purposes only and should not replace professional medical advice.'
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Chat message error: {str(e)}")
        return jsonify({
            'error': 'Unable to process chat message',
            'message': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint with Ollama status"""
    ollama_available, ollama_status = check_ollama_availability()
    
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'services': {
            'flask': 'healthy',
            'ollama': 'healthy' if ollama_available else 'unavailable',
            'meditron': 'ready' if ollama_available else 'not-ready'
        },
        'ollama_status': ollama_status,
        'ollama_url': OLLAMA_BASE_URL,
        'model_name': MODEL_NAME
    })

if __name__ == '__main__':
    print("🤖 Starting CareBot Chat Server with Ollama Meditron Integration...")
    print("🌐 Server will run on http://localhost:8000")
    print("📋 Endpoints:")
    print("  - POST /api/medical-chat (Medical chat with Meditron)")
    print("  - POST /api/chat/message (Chat message)")
    print("  - GET /health (Health check with Ollama status)")
    print("=" * 60)
    
    # Check Ollama availability at startup
    print("🔍 Checking Ollama connection...")
    ollama_available, ollama_status = check_ollama_availability()
    
    if ollama_available:
        print("✅ Ollama and Meditron are ready! AI-powered medical responses available.")
    else:
        print(f"⚠️  Ollama not ready: {ollama_status}")
        print("   Fallback responses will be used until Ollama is installed.")
        print("   To enable Meditron:")
        print("   1. Install Ollama from: https://ollama.ai/download")
        print("   2. Run: ollama serve")
        print("   3. Run: ollama pull meditron")
    
    print("=" * 60)
    print("🌐 Starting server...")
    app.run(host='0.0.0.0', port=8000, debug=True)
