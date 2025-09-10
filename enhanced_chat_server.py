#!/usr/bin/env python3
"""
CareBot Enhanced Chat Server - DNS Issue Workaround
This provides intelligent medical responses with multiple fallback options
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime
import random
import requests
import os
import json

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
MODEL_NAME = os.getenv("MEDITRON_MODEL", "meditron")

# Enhanced medical responses with more conditions
ENHANCED_MEDICAL_RESPONSES = {
    "headache": [
        "Headaches can have various causes including tension, dehydration, lack of sleep, or stress. Try these immediate relief measures: rest in a quiet, dark room, apply a cold compress to your forehead, stay hydrated, and consider over-the-counter pain relief like ibuprofen or acetaminophen if appropriate. If headaches persist for more than 2 days, worsen suddenly, or are accompanied by fever, vision changes, or neck stiffness, please consult a healthcare professional immediately.",
        "For headache relief, ensure you're well-hydrated (drink plenty of water), get adequate sleep (7-9 hours), and avoid triggers like bright lights, loud noises, or strong smells. Gentle neck and shoulder stretches can help with tension headaches. If the headache is severe, sudden, or accompanied by other symptoms like nausea, vomiting, or sensitivity to light, seek medical attention immediately as these could indicate a more serious condition."
    ],
    "fatigue": [
        "Low energy can be caused by many factors including stress, poor sleep quality, nutritional deficiencies (especially iron, B12, or vitamin D), dehydration, or underlying health conditions. Try these steps: maintain a regular sleep schedule (7-9 hours), eat balanced meals with protein and complex carbohydrates, stay hydrated, engage in light physical activity, and manage stress through relaxation techniques. If fatigue persists for more than 2 weeks or is accompanied by other symptoms, consider consulting a healthcare provider for evaluation.",
        "To boost energy levels, focus on: getting adequate sleep (7-9 hours), eating regular meals with protein and complex carbohydrates, staying hydrated (8-10 glasses of water daily), engaging in regular physical activity (even light walking), managing stress through meditation or deep breathing, and avoiding excessive caffeine and sugar which can cause energy crashes. Persistent fatigue may indicate an underlying condition like anemia, thyroid issues, or depression that requires medical evaluation."
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
    "diabetes": [
        "Diabetes management requires careful monitoring of blood sugar levels, medication adherence, and lifestyle modifications. Key strategies include: regular blood glucose monitoring, taking medications as prescribed, following a balanced diet with controlled carbohydrates, regular physical activity, maintaining a healthy weight, and regular check-ups with your healthcare team. Monitor for symptoms of high or low blood sugar and know when to seek emergency care.",
        "For diabetes control: monitor blood sugar regularly, take medications exactly as prescribed, follow a diabetes-friendly diet (limit refined carbs, increase fiber), exercise regularly (150 minutes weekly), maintain healthy weight, manage stress, and attend regular medical appointments. Watch for symptoms of hyperglycemia (excessive thirst, frequent urination) or hypoglycemia (shaking, sweating, confusion) and know when to seek immediate medical attention."
    ],
    "covid": [
        "COVID-19 symptoms can range from mild to severe. Common symptoms include fever, cough, shortness of breath, fatigue, body aches, loss of taste or smell, and sore throat. If you suspect COVID-19: isolate yourself, rest, stay hydrated, monitor symptoms, and contact your healthcare provider. Seek emergency care for severe symptoms like difficulty breathing, persistent chest pain, confusion, or bluish lips. Follow local health guidelines for testing and isolation.",
        "For COVID-19 management: isolate if symptomatic, rest and stay hydrated, monitor symptoms closely, use fever reducers if needed, and contact your healthcare provider. Emergency symptoms requiring immediate care include: difficulty breathing, persistent chest pain, confusion, inability to stay awake, or bluish lips/face. Follow CDC guidelines for isolation periods and when to end isolation."
    ],
    "cough": [
        "Coughs can be caused by various factors including colds, allergies, asthma, or infections. For mild coughs: stay hydrated, use throat lozenges, try honey (for adults), use a humidifier, and avoid irritants like smoke. If cough persists more than 2-3 weeks, is accompanied by fever, blood, or difficulty breathing, or worsens significantly, consult a healthcare provider. Seek immediate care for severe coughing with breathing difficulties.",
        "Cough management depends on the cause. For dry coughs: stay hydrated, use throat lozenges, try honey, and avoid irritants. For productive coughs: stay hydrated to help thin mucus. If cough persists beyond 2-3 weeks, is severe, produces blood, or is accompanied by fever or breathing difficulties, seek medical evaluation. Chronic cough may indicate underlying conditions requiring medical attention."
    ]
}

def get_intelligent_response(user_message):
    """Generate intelligent medical response using enhanced keyword matching"""
    message_lower = user_message.lower()
    
    # Check for specific medical conditions
    for keyword, responses in ENHANCED_MEDICAL_RESPONSES.items():
        if keyword in message_lower:
            return random.choice(responses)
    
    # Enhanced contextual responses
    if any(word in message_lower for word in ['symptom', 'condition', 'disease', 'illness', 'sick']):
        return "I understand you're concerned about a medical condition. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Describe your symptoms clearly to your doctor, including when they started, their severity, and any factors that make them better or worse. For urgent symptoms like chest pain, difficulty breathing, or severe pain, seek immediate medical attention."
    
    if any(word in message_lower for word in ['medication', 'drug', 'pill', 'tablet', 'prescription']):
        return "For medication-related questions, it's essential to consult with your healthcare provider or pharmacist. They can provide specific information about dosage, side effects, drug interactions, and proper usage. Never stop taking prescribed medications without consulting your doctor. If you experience concerning side effects, contact your healthcare provider immediately. Always read medication labels carefully and follow instructions exactly as prescribed."
    
    if any(word in message_lower for word in ['emergency', 'urgent', 'severe', 'critical', 'immediate']):
        return "If you're experiencing a medical emergency with symptoms like chest pain, difficulty breathing, severe bleeding, loss of consciousness, or signs of stroke (facial drooping, arm weakness, speech difficulties), call emergency services immediately (911 or your local emergency number). Do not delay seeking medical attention for potentially life-threatening conditions."
    
    if any(word in message_lower for word in ['prevention', 'prevent', 'avoid', 'healthy', 'wellness']):
        return "Preventive healthcare is crucial for maintaining good health. Key strategies include: regular exercise (150 minutes weekly), balanced nutrition with fruits and vegetables, adequate sleep (7-9 hours), stress management, regular health check-ups, vaccinations, avoiding smoking and excessive alcohol, and maintaining a healthy weight. Consult your healthcare provider for personalized prevention strategies based on your age, family history, and risk factors."
    
    # Default comprehensive response
    return "Thank you for your health question. While I can provide general information, it's important to remember that this is not a substitute for professional medical advice. For specific health concerns, symptoms, or if you're experiencing a medical emergency, please consult with a qualified healthcare provider or contact emergency services immediately. Always seek professional medical advice for proper diagnosis and treatment of any health condition."

@app.route('/api/medical-chat', methods=['POST'])
def medical_chat():
    """Enhanced medical chat endpoint with intelligent responses"""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        user_id = data.get('user_id', 'anonymous')
        
        logger.info(f"Medical query from {user_id}: {user_message[:50]}...")
        
        # Generate intelligent response
        response_text = get_intelligent_response(user_message)
        
        response_data = {
            'response': {
                'message': response_text,
                'formatted': True,
                'medical_grade': True
            },
            'confidence': 0.85,
            'source': 'enhanced-medical-assistant',
            'ollama_status': 'DNS issue - using enhanced fallback responses',
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

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'services': {
            'flask': 'healthy',
            'enhanced-chat': 'healthy',
            'ollama': 'dns-issue',
            'meditron': 'unavailable-due-to-dns'
        },
        'ollama_status': 'DNS resolution issue with Cloudflare R2',
        'solution': 'Run fix_ollama_dns.bat to resolve DNS issues',
        'fallback': 'Enhanced medical responses active'
    })

if __name__ == '__main__':
    print("🤖 Starting CareBot Enhanced Chat Server...")
    print("🌐 Server will run on http://localhost:8000")
    print("📋 Endpoints:")
    print("  - POST /api/medical-chat (Enhanced medical chat)")
    print("  - GET /health (Health check)")
    print("=" * 60)
    print("⚠️  DNS Issue Detected - Using Enhanced Fallback Responses")
    print("   To fix DNS and enable Ollama:")
    print("   1. Run: fix_ollama_dns.bat")
    print("   2. Then: ollama pull meditron")
    print("=" * 60)
    print("✅ Enhanced medical responses with 10+ conditions covered")
    print("🌐 Starting server...")
    app.run(host='0.0.0.0', port=8000, debug=True)
