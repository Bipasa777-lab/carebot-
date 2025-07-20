const ChatHistory = require('../models/ChatHistory');
const aiService = require('../services/aiService');
const medicalValidator = require('../utils/validator');
const logger = require('../utils/logger');

// POST /api/chat/message
exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user.id; // Assumes auth middleware adds req.user

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required.' });
    }

    // Step 1: Validate query intent
    const validation = await aiService.validateMedicalQuery(message);

    if (!validation.isValid) {
      logger.warn(`Rejected non-medical query: "${message}"`);
      return res.status(400).json({
        error: 'Query does not appear to be medically relevant.',
        validation
      });
    }

    // Step 2: Send to Flask AI Server
    const aiResponse = await aiService.getMedicalResponse(message, userId, {
      riskLevel: validation.riskLevel
    });

    // Step 3: Store chat history
    const chat = await ChatHistory.findOneAndUpdate(
      { userId, sessionId },
      {
        $push: {
          messages: [
            {
              sender: 'user',
              message,
              metadata: {
                riskLevel: validation.riskLevel
              }
            },
            {
              sender: 'ai',
              message: aiResponse.data?.response?.message || aiResponse.fallback,
              metadata: {
                confidence: aiResponse.data?.confidence || 0,
                aiModel: aiResponse.data?.source || 'fallback'
              }
            }
          ]
        },
        $setOnInsert: {
          userId,
          sessionId,
          createdAt: new Date()
        },
        updatedAt: new Date(),
        medicalContext: {
          symptoms: validation.symptoms || [],
          urgency: validation.riskLevel === 'HIGH' ? 'high' : 'low',
          category: 'general',
          followUpRequired: validation.riskLevel === 'HIGH'
        }
      },
      { new: true, upsert: true }
    );

    // Step 4: Return AI response
    res.status(200).json({
      success: true,
      reply: aiResponse.data?.response,
      sessionId,
      riskLevel: validation.riskLevel,
      timestamp: new Date()
    });

  } catch (error) {
    logger.error(`Chat error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/chat/history/:sessionId
exports.getSessionHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const history = await ChatHistory.findOne({ userId, sessionId });

    if (!history) {
      return res.status(404).json({ error: 'Chat session not found.' });
    }

    res.status(200).json({ sessionId, messages: history.messages });
  } catch (error) {
    logger.error(`Get session history error: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
