import { Link } from "react-router-dom";

const LeftSideBar = ({ chats, onActiveChat, activeChat }) => {
  return (
    <aside className="hidden sm:flex w-72 flex-col border-r border-white/10 bg-[#09022c]">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <span className="text-lg font-semibold text-red-600">Nazim AI</span>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        <span className="block px-3 py-2 text-xs font-semibold tracking-wider text-gray-400">
          DASHBOARD
        </span>

        <Link
          to="/dashboard"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition"
        >
          ➕ Create a new Chat
        </Link>

        <Link
          to="/"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition"
        >
          🌐 Explore Nazim AI
        </Link>

        <Link
          to="/contact"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition"
        >
          📩 Contact
        </Link>
      </nav>

      <hr className="border-white/10 mx-3" />

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <span className="block px-3 py-2 text-xs font-semibold tracking-wider text-gray-400">
          RECENT CHATS
        </span>

        <div className="space-y-1">
          {chats.map((chat) => {
            const isActive = activeChat?._id === chat._id;

            return (
              <Link
                key={chat._id}
                to={`/dashboard/chats/${chat._id}`}
                onClick={() => onActiveChat(chat)}
                className={`block rounded-lg px-3 py-2 text-sm transition
                  ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                `}
              >
                {chat.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-400">
        Logged in as <span className="font-medium text-white">Nazim</span>
      </div>
    </aside>
  );
};

export default LeftSideBar;
