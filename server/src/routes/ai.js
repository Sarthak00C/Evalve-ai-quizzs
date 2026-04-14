import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Generate quiz with AI (Google Gemini)
router.post('/generate-quiz', authenticateToken, [
    body('prompt').trim().notEmpty().withMessage('Prompt is required'),
    body('topic').optional({ checkFalsy: true }).trim(),
    body('difficulty').optional({ checkFalsy: true }).isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard'),
    body('count').optional({ checkFalsy: true }).isInt({ min: 1, max: 10 }).withMessage('Count must be between 1 and 10'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { prompt, topic, difficulty, count } = req.body;
        const resolvedTopic = topic || 'general knowledge';
        const resolvedDifficulty = difficulty || 'medium';
        const resolvedCount = parseInt(count) || 5;

        const googleApiKey = process.env.GOOGLE_API_KEY;
        if (!googleApiKey) {
            return res.status(500).json({ error: 'Google API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(googleApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const fullPrompt = `You are a quiz question generator. Generate exactly ${resolvedCount} multiple choice questions.
Topic: ${resolvedTopic}
Difficulty: ${resolvedDifficulty}
User request: ${prompt || `Generate ${resolvedCount} quiz questions about ${resolvedTopic}`}

Respond ONLY with a valid JSON object (no markdown, no code fences) in this exact format:
{
  "title": "Quiz title here",
  "topic": "${resolvedTopic}",
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ]
}

correctAnswer is the 0-based index of the correct option. Generate exactly ${resolvedCount} questions.`;

        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();

        // Strip markdown code fences if present
        const cleaned = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();

        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse AI response');
        }

        const quizData = JSON.parse(jsonMatch[0]);

        res.json({
            title: quizData.title,
            topic: quizData.topic,
            questions: quizData.questions.map((q) => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
            })),
        });
    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({ error: error.message || 'AI generation failed' });
    }
});

export default router;