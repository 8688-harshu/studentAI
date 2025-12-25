const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('GEMINI_API_KEY is missing in .env');
}

const genAI = new GoogleGenerativeAI(apiKey);

module.exports = genAI;
