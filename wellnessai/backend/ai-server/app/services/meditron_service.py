import ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from app.models.medical_prompt import MedicalPromptTemplate
from app.utils.preprocessing import preprocess_query
import json
import logging

class MeditronService:
    def __init__(self):
        self.model_name = "meditron"  # Ollama Meditron model
        self.prompt_template = MedicalPromptTemplate()
        self.logger = logging.getLogger(__name__)
        
    def generate_response(self, query, user_id=None, context={}):
        try:
            # Preprocess the query
            processed_query = preprocess_query(query)
            
            # Create medical prompt
            medical_prompt = self.prompt_template.create_medical_prompt(
                query=processed_query,
                context=context
            )
            
            # Generate response using Ollama
            response = ollama.chat(
                model=self.model_name,
                messages=[
                    {
                        'role': 'system',
                        'content': self._get_system_prompt()
                    },
                    {
                        'role': 'user',
                        'content': medical_prompt
                    }
                ]
            )
            
            # Format and validate response
            formatted_response = self._format_response(response['message']['content'])
            
            return {
                'response': formatted_response,
                'confidence': 0.85,
                'source': 'meditron',
                'timestamp': self._get_timestamp(),
                'disclaimer': self._get_medical_disclaimer()
            }
            
        except Exception as e:
            self.logger.error(f"Meditron service error: {str(e)}")
            return self._get_fallback_response()
    
    def _get_system_prompt(self):
        return """You are WellnessAI, a medical assistant powered by Meditron. 
        Provide accurate, evidence-based medical information while emphasizing 
        the importance of professional medical consultation. Always include 
        appropriate disclaimers and never provide emergency medical advice."""
    
    def _format_response(self, raw_response):
        # Format the response for better readability
        return {
            'message': raw_response,
            'formatted': True,
            'medical_grade': True
        }
    
    def _get_medical_disclaimer(self):
        return """This information is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for medical concerns."""
    
    def _get_fallback_response(self):
        return {
            'response': {
                'message': 'I apologize, but I cannot process your medical query at this time. Please consult a healthcare professional.',
                'formatted': True
            },
            'confidence': 0.0,
            'source': 'fallback',
            'error': True
        }
    
    def _get_timestamp(self):
        from datetime import datetime
        return datetime.utcnow().isoformat()