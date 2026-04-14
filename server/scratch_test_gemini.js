import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const apiKey = process.env.GOOGLE_API_KEY;
  console.log('Testing key:', apiKey?.substring(0, 10) + '...');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTry = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hi');
      console.log(`Success with ${modelName}!`, result.response.text());
      return;
    } catch (err) {
      console.error(`Error with ${modelName}:`, err.status || err.message, err.statusText || '');
    }
  }
}

test();
