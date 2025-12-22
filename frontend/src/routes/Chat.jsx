import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../../secret";
import NewPrompt from "../components/NewPrompt";

const Chat = () => {
  const path = useLocation().pathname;
  console.log(path, "path");
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: () =>
      fetch(`${serverUrl}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const endRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.history]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#0b022c] text-white pt-18">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {data?.history?.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`
    w-fit max-w-[90%] sm:max-w-[75%] lg:max-w-xl
    rounded-2xl px-4 py-2
    whitespace-pre-wrap wrap-break-word text-sm sm:text-base
    ${
      isUser
        ? "bg-purple-600/30 text-white self-start"
        : "bg-white/10 text-gray-200 self-end"
    }
  `}
            >
              {msg?.parts?.[0]?.text}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input box */}
      <div className="border-t border-white/10 p-4 bg-[#09022c]">
        <NewPrompt />
      </div>
    </div>
  );
};

export default Chat;
