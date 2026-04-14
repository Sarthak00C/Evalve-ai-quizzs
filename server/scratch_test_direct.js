import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "Hi" }] }]
    });
    console.log('Success!', JSON.stringify(response.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('Error Status:', err.response.status);
      console.error('Error Data:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error('Error:', err.message);
    }
  }
}

test();
