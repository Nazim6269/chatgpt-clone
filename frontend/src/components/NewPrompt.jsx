import { GoogleGenAI } from "@google/genai";
import { Image, ImageKitProvider } from "@imagekit/react";
import { useState } from "react";
import Upload from "./Upload";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: apikey });

const NewPrompt = () => {
  const [img, setImg] = useState({ dbData: {} });
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt) return alert("Please enter a prompt!");

    setLoading(true);
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setAiResponse(result.text);
      setPrompt("");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {img.dbData?.filePath && (
        <ImageKitProvider urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}>
          <Image
            src={img.dbData.filePath}
            width={500}
            height={500}
            alt="Uploaded preview"
            transformation={[{ width: 500, height: 500 }]}
            className="rounded-xl"
          />
        </ImageKitProvider>
      )}
      {/* AI text Response */}
      {aiResponse && (
        <div className="bg-white/10 px-4 text-gray-200  max-w-xl  p-4 rounded-xl whitespace-pre-wrap">
          {aiResponse}
        </div>
      )}
      {/* Prompt Form */}
      <form
        onSubmit={handleGenerate}
        className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-2xl shadow-md"
      >
        {/* Upload */}
        <Upload setImg={setImg} />

        {/* Text Input */}
        <input
          type="text"
          placeholder="Ask Nazim AI anything..."
          className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-white
          placeholder:text-white/50 outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center rounded-2xl bg-purple-600
          px-4 py-3 text-sm font-medium text-white hover:bg-purple-500 transition
          disabled:opacity-50"
        >
          {loading ? (
            "..."
          ) : (
            <img src="/arrow.png" alt="Send" className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;
