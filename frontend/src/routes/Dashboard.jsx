import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

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

const Dashboard = () => {
  const [activeChat, setActiveChat] = useState(chatsMock[0]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const handleGenerate = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    setLoading(true);
    //this is post request to chats history api
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, text }),
    });
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#0b022c] text-white">
      {/* Left side SIDEBAR (Desktop) */}

      {/* Right side  */}
      <main className="flex flex-1 flex-col  justify-center ">
        {/* Chat header */}
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

        {/* Image Section */}
        <div className="flex flex-col items-center justify-center gap-6 mt-8">
          <div className="logo flex items-center gap-3">
            <img src="/logo.png" alt="" className="w-24 sm:w-22" />
            <h1 className="text-3xl sm:text-4xl font-bold">Nazim AI</h1>
          </div>

          {/* Options */}
          <div className="options flex flex-col gap-4 sm:flex-row sm:gap-6">
            {options.map((opt) => (
              <div
                key={opt.label}
                className="option flex flex-col items-center gap-2 rounded-xl bg-white/5 px-6 py-4 text-center hover:bg-white/10 transition cursor-pointer"
              >
                <img src={opt.icon} alt="" className="h-12 w-12" />
                <span className="text-sm sm:text-base">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 absolute bottom-0 sm:w-lg">
          <form
            onSubmit={handleGenerate}
            className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-2xl shadow-md"
          >
            {/* Text Input */}
            <input
              type="text"
              placeholder="Ask Nazim AI anything..."
              className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-white
          placeholder:text-white/50 outline-none"
              name="text"
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
      </main>
    </div>
  );
};

export default Dashboard;
