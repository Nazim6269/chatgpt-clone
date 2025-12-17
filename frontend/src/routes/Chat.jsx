import { useEffect, useRef, useState } from "react";
import NewPrompt from "../components/NewPrompt";

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: "user", text: "Hi there!" },
    { role: "ai", text: "Hello! How can I help you today?" },
    { role: "user", text: "Explain Tailwind CSS" },
    { role: "ai", text: "Tailwind CSS is a utility-first CSS framework..." },
    { role: "user", text: "Thanks for explaining!" },
    { role: "ai", text: "You're welcome!" },
  ]);

  const endRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-[#0b022c] text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl rounded-2xl px-4 py-2 whitespace-pre-wrap wrap-break-word
              ${
                msg.role === "user"
                  ? "bg-purple-600/30 text-white ml-0"
                  : "bg-white/10 text-gray-200 ml-auto"
              }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input box */}
      <div className="border-t border-white/10 p-4">
        <NewPrompt setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat;
