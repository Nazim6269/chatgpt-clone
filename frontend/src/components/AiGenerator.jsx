import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: apikey });

export default function AiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Please enter a prompt!");

    setLoading(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;
      setResponse(text);
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white/10 backdrop-blur rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Gemini AI Generator
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
        className="w-full p-3 rounded-xl bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate Text"}
      </button>

      <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/20 whitespace-pre-wrap">
        <strong className="block mb-2 text-purple-400">Response:</strong>
        <p className="text-sm">
          {response || "The AI response will appear here."}
        </p>
      </div>
    </div>
  );
}
