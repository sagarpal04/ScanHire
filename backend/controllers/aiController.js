import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export const generateAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not defined in the backend .env file!");
      return res.status(400).json({
        error: "GEMINI_API_KEY is missing. Please add your Gemini API Key to the backend/.env file."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    console.log("🤖 Querying Gemini 2.5 Lite...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      text: text
    });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate content using Gemini"
    });
  }
};
