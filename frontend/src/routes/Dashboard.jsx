import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../secret";

const chatsMock = [
  { id: 1, title: "Build a chatbot UI" },
  { id: 2, title: "Explain React hooks" },
  { id: 3, title: "Tailwind gradients" },
];

const options = [
  { icon: "/chat.png", label: "Create a New Chat" },
  { icon: "/image.png", label: "Analyze Images" },
  { icon: "/code.png", label: "Help me with my Code" },
];
//==================this function will fetch chats===================//
const fetchChats = async (text) => {
  const response = await fetch(`${serverUrl}/api/chats`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user chats");
  }

  return response.json();
};

//====================Dashboard component starts from here==================//
const Dashboard = () => {
  const [activeChat, setActiveChat] = useState(chatsMock[0]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetchChats,
    onSuccess: (id) => {
      queryClient.invalidateQueries(["users-chats"]);
      navigate(`/dashboard/chats/${id.chatId}`);
    },
  });

  //== this will trigger when form is submitted========//
  const handleGenerate = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text || loading) return;

    mutation.mutate(text);
    e.target.reset();
  };

  return (
    <div className="flex h-screen bg-[#0b022c] text-white">
      {/* Right side */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Chat header (Mobile) */}
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:hidden">
          <button
            onClick={() => setOpenSidebar(true)}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
          >
            Chats
          </button>
          <h3 className="text-sm font-medium truncate">{activeChat.title}</h3>
        </header>

        {/* Sidebar Drawer (Mobile) */}
        {openSidebar && (
          <div className="absolute inset-0 z-50 bg-black/40 sm:hidden">
            <div className="absolute left-0 top-0 h-full w-72 bg-[#09022c] border-r border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-sm font-semibold">Chats</span>
                <button
                  onClick={() => setOpenSidebar(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 space-y-2">
                {chatsMock.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChat(chat);
                      setOpenSidebar(false);
                    }}
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-left text-sm hover:bg-white/20"
                  >
                    {chat.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 flex justify-center items-center overflow-y-auto px-4 py-6">
          <div className="mx-auto flex max-w-3xl flex-col  items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 pt-6 sm:pt-10">
              <img src="/logo.png" alt="Nazim AI" className="w-16 sm:w-20 " />
              <h1 className="text-2xl sm:text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Nazim AI
              </h1>
            </div>

            {/* Options */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {options.map((opt) => (
                <div
                  key={opt.label}
                  className="
            flex flex-col items-center gap-2
            rounded-xl
            bg-white/5
            px-4 py-4 sm:px-6
            text-center
            transition
            hover:bg-white/10
            cursor-pointer
          "
                >
                  <img
                    src={opt.icon}
                    alt={opt.label}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  />
                  <span className="text-sm sm:text-base">{opt.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input (Sticky) */}
        <div className="sticky bottom-0 border-t border-white/10 bg-[#0b022c] px-3 py-2 sm:p-4">
          <form
            onSubmit={handleGenerate}
            className="
      mx-auto flex w-full max-w-3xl items-center gap-2 sm:gap-3
      rounded-2xl bg-white/10
      p-2 sm:p-3
      shadow-md
    "
          >
            {/* Text Input */}
            <input
              autoFocus
              type="text"
              name="text"
              placeholder="Ask Nazim AI anything..."
              disabled={loading}
              className="
        flex-1 min-w-0
        rounded-2xl
        bg-transparent
        px-3 sm:px-4
        py-2.5 sm:py-3
        text-sm sm:text-base
        text-white
        placeholder:text-white/50
        outline-none
        disabled:opacity-60
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
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
