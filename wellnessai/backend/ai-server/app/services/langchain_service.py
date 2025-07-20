import logging
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms.ollama import Ollama
from ..config.model_Settings import settings
from app.models.medical_prompt import MedicalPromptTemplate
from app.utils.preprocessing import preprocess_query

class LangChainService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.prompt_template = MedicalPromptTemplate()
        self.model_name = settings.MODEL_NAME
        self.temperature = settings.TEMPERATURE
        self.max_tokens = settings.MAX_TOKEN_LENGTH

        try:
            self.llm = Ollama(
                model=self.model_name,
                temperature=self.temperature,
                base_url=settings.OLLAMA_HOST,
                max_tokens=self.max_tokens
            )
            self.logger.info(f"LangChainService initialized with model: {self.model_name}")
        except Exception as e:
            self.logger.error(f"Error initializing LangChain LLM: {str(e)}")
            self.llm = None

    def generate_response(self, query, context=None):
        try:
            context = context or {}

            # Preprocess the incoming query
            processed_query = preprocess_query(query)

            # Build the prompt string
            prompt_text = self.prompt_template.create_medical_prompt(
                query=processed_query,
                context=context
            )

            # Define LangChain prompt and chain
            prompt = PromptTemplate(
                input_variables=["query"],
                template=(
                    "You are WellnessAI, a medical assistant trained to provide helpful, "
                    "non-emergency, evidence-based answers. Here's the user's question:\n\n"
                    "{query}"
                )
            )

            chain = LLMChain(prompt=prompt, llm=self.llm)

            # Run the LLMChain with the query
            result = chain.run(query=prompt_text)

            return {
                'response': {
                    'message': result.strip(),
                    'formatted': True,
                    'medical_grade': True
                },
                'source': 'langchain',
                'confidence': 0.80,
                'timestamp': self._get_timestamp(),
                'disclaimer': self._get_disclaimer()
            }

        except Exception as e:
            self.logger.error(f"LangChainService error: {str(e)}")
            return self._fallback_response()

    def _get_timestamp(self):
        from datetime import datetime
        return datetime.utcnow().isoformat()

    def _get_disclaimer(self):
        return (
            "This is AI-generated medical information and should not replace consultation with "
            "a licensed healthcare provider. For emergencies, seek professional help immediately."
        )

    def _fallback_response(self):
        return {
            'response': {
                'message': (
                    "Sorry, I'm unable to generate a reliable medical response at the moment. "
                    "Please consult a healthcare professional."
                ),
                'formatted': True
            },
            'source': 'fallback',
            'confidence': 0.0,
            'error': True
        }
