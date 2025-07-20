const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// Routes
router.post('/message', auth, chatController.sendMessage);
router.get('/history/:sessionId', auth, chatController.getSessionHistory);

module.exports = router;
