const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview.controller');

// POST /api/interviews/generate
router.post('/generate', interviewController.generateQuestions);

// POST /api/interviews/evaluate
router.post('/evaluate', interviewController.evaluateAnswer);

module.exports = router;