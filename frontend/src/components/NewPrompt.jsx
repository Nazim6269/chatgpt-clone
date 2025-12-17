import { GoogleGenAI } from "@google/genai";
import { Image, ImageKitProvider } from "@imagekit/react";
import { useState } from "react";
import Markdown from "react-markdown";
import Upload from "./Upload";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apikey });

const NewPrompt = () => {
  const [img, setImg] = useState({ dbData: {} });
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt && !img.dbData?.filePath)
      return alert("Please enter a prompt or upload an image!");

    setQuestion(prompt || "Image input");

    setLoading(true);
    try {
      const contents = [];

      if (prompt) {
        contents.push({ type: "text", text: prompt });
      }

      if (img.dbData?.filePath) {
        contents.push({
          type: "image",
          imageUrl: img.dbData.filePath,
          caption: "User uploaded image",
        });
      }

      const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents,
      });

      for await (const chunk of response) {
        setAiResponse(chunk.text);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Oops! Something went wrong.");
    } finally {
      setLoading(false);
      setPrompt("");
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
      {question && (
        <div className="bg-purple-600/30 text-white max-w-xl px-4 py-3 rounded-xl whitespace-pre-wrap word-break-wrap">
          {question}
        </div>
      )}

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-white/10 text-gray-200 max-w-xl px-4 py-3 rounded-xl whitespace-pre-wrap word-break-wrap">
          <Markdown>{aiResponse}</Markdown>
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
