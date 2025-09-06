// server/configs/gemini.js

import 'dotenv/config'; // Make sure this is the first import
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("[gemini] GEMINI_API_KEY not set in environment variables.");
  // Optional: Throw an error to stop the application if the key is critical
  // throw new Error("GEMINI_API_KEY not found. Please set it in your .env file.");
}

const ai = new GoogleGenerativeAI(apiKey);

/**
 * Generates blog content using the Google Gemini model.
 * @param {string} prompt The text prompt to generate content from.
 * @param {object} [opts={}] Optional configuration for the model.
 * @param {string} [opts.model="gemini-1.5-flash"] The model name to use.
 * @returns {Promise<string>} A promise that resolves with the generated text.
 * @throws {Error} If the prompt is invalid or no content is returned.
 */
export default async function generateBlogContent(prompt, opts = {}) {
  if (!prompt || typeof prompt !== "string") {
    const e = new Error("Prompt must be a non-empty string");
    e.code = "INVALID_PROMPT";
    throw e;
  }

  const modelName = opts.model || "gemini-1.5-flash"; 
  const model = ai.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (!text) {
      throw new Error("No textual content returned from Gemini");
    }
    return text;
  } catch (err) {
    console.error("Gemini wrapper error:", err);
    throw err;
  }
}