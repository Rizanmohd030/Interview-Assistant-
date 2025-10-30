// backend/src/services/gemini.service.js
const { GoogleGenAI } = require('@google/genai');
const config = require('../config/env.config');

class GeminiService {
  constructor() {
    if (!config.geminiApiKey) {
      throw new Error('Missing GEMINI_API_KEY in environment');
    }
    this.client = new GoogleGenAI({ apiKey: config.geminiApiKey });
  }

  async generateInterviewQuestions(jobRole, jobDescription) {
    const prompt = `
You are an expert interviewer.
Job Role: ${jobRole}
Job Description: ${jobDescription || 'Not provided'}

Generate 5 interview questions with model answers in the following JSON format:
[
  {
    "question": "string",
    "answer": "string",
    "category": "Technical/Behavioral/Situational"
  }
]
    `;

    try {
      const response = await this.client.models.generateContent({
        model: 'gemini-2.0-flash',   // choose a supported model
        contents: prompt
      });

      const text = response.text;
      console.log('Raw Gemini response:', text);

      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON array from Gemini response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini API Error (Questions):', error);
      throw new Error('Failed to generate interview questions');
    }
  }

  async generateFeedback(userAnswer, expectedAnswer) {
    const prompt = `
Expected Answer: ${expectedAnswer}
User Answer: ${userAnswer}

Provide feedback in JSON format:
{
  "score": number,
  "strengths": ["string"],
  "improvements": ["string"],
  "overall": "string"
}
    `;

    try {
      const response = await this.client.models.generateContent({
        model: 'gemini-2.0-flash',   // same or different model as desired
        contents: prompt
      });
      const text = response.text;
      console.log('Raw Gemini feedback response:', text);

      const jsonMatch = text.match(/\{\s*"score"[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON object from feedback response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini API Error (Feedback):', error);
      throw new Error('Failed to generate feedback');
    }
  }
}

module.exports = new GeminiService();
