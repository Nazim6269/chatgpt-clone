import { GoogleGenAI } from "@google/genai";
import { Image, ImageKitProvider } from "@imagekit/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Markdown from "react-markdown";
import { geminiApiKey, imagekitUrl, serverUrl } from "../../secret";
import Upload from "./Upload";

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

//========= New prompt component starts from here===================//
const NewPrompt = ({ data }) => {
  const [img, setImg] = useState({ dbData: {}, aiData: {} });
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  //=============== this is the data mutation function================//
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (fullResponse) => {
      const res = await fetch(`${serverUrl}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer: fullResponse,
          img: img.dbData?.filePath || undefined,
        }),
      });

      return res.json();
    },
    onSuccess: (data) => {
      queryClient
        .invalidateQueries({ queryKey: ["chats", data._id] })
        .then(() => {
          setQuestion("");

          setImg({
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //========== This is on submit function ==================//
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
      let fullResponse = "";
      for await (const chunk of response) {
        fullResponse += chunk.text || "";
        setAiResponse(fullResponse);
      }

      mutation.mutate(fullResponse);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Oops! Something went wrong.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="space-y-4 ">
      {/* Image Preview */}
      {img.dbData?.filePath && (
        <ImageKitProvider urlEndpoint={imagekitUrl}>
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
        className="
    flex items-center gap-2 sm:gap-3
    w-full
    bg-white/10
    p-2 sm:p-3
    rounded-2xl
    shadow-md
  "
      >
        {/* Upload */}
        <div className="shrink-0">
          <Upload setImg={setImg} />
        </div>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Ask Nazim AI anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="
      flex-1
      min-w-0
      rounded-2xl
      bg-transparent
      px-3 sm:px-4
      py-2.5 sm:py-3
      text-sm sm:text-base
      text-white
      placeholder:text-white/50
      outline-none
    "
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="
      shrink-0
      flex items-center justify-center
      rounded-2xl
      bg-purple-600
      p-2.5 sm:px-4 sm:py-3
      text-sm font-medium
      text-white
      hover:bg-purple-500
      transition
      disabled:opacity-50
    "
        >
          {loading ? (
            <span className="text-xs sm:text-sm">...</span>
          ) : (
            <img
              src="/arrow.png"
              alt="Send"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;
