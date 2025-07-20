# File: backend/ai-server/app/utils/preprocessing.py

import re

def preprocess_query(query: str) -> str:
    """
    Clean the query by removing unnecessary symbols and normalizing whitespace.
    """
    query = query.strip()
    query = re.sub(r'\s+', ' ', query)
    query = re.sub(r'[^\w\s.,!?-]', '', query)
    return query
