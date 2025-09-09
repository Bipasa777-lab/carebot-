const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logger = require('../utils/logger');

// Direct Meditron API endpoint
router.post('/meditron', auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id;

    if (!prompt) {
      return res.status(400).json({ 
        error: 'Prompt is required',
        usage: 'POST /api/meditron with { "prompt": "your medical question" }'
      });
    }

    // Call Ollama Meditron directly
    const fetch = require('node-fetch');
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'meditron',
        prompt: prompt,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Log the interaction
    logger.info(`Meditron query from user ${userId}: "${prompt.substring(0, 50)}..."`);

    res.json({
      success: true,
      response: data.response,
      model: 'meditron',
      timestamp: new Date().toISOString(),
      disclaimer: 'This AI response is for informational purposes only and does not substitute professional medical advice. Please consult a licensed healthcare provider.',
      user_id: userId
    });

  } catch (error) {
    logger.error(`Meditron API error: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to get Meditron response',
      message: error.message,
      fallback: 'Please try again later or consult a healthcare professional directly.'
    });
  }
});

module.exports = router;