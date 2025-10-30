const GeminiService = require('../services/gemini.service');
const jobFetcherService = require('../services/job-fetcher.service');
const axios = require("axios");
const config = require("../config/env.config");


class InterviewController {
  async generateQuestions(req, res, next) {
    try {
      const { jobRole, location } = req.body;
      if (!jobRole) {
        return res.status(400).json({ error: 'Job role is required' });
      }
      const jobData = await jobFetcherService.fetchJobDescription(jobRole, location);
      const questions = await GeminiService.generateInterviewQuestions(jobData.jobRole, jobData.description);
      res.json({
        jobRole: jobData.jobRole,
        location: jobData.location,
        questionsGenerated: questions.length,
        questions
      });
    } catch (error) {
      next(error);
    }
  }

  async evaluateAnswer(req, res, next) {
    try {
      const { userAnswer, expectedAnswer } = req.body;
      if (!userAnswer || !expectedAnswer) {
        return res.status(400).json({ error: 'Both userAnswer and expectedAnswer are required' });
      }
      const feedback = await GeminiService.generateFeedback(userAnswer, expectedAnswer);
      res.json({ feedback });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InterviewController();
