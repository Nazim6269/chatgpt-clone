const LeftSideBar = ({ chatsMock, onActiveChat, activeChat }) => {
  return (
    <aside className="hidden sm:flex w-72 flex-col border-r border-white/10 bg-[#09022c]">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Nazim AI</h2>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chatsMock.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onActiveChat(chat)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition
                ${
                  activeChat.id === chat.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
          >
            {chat.title}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-sm text-gray-400">
        Logged in as Nazim
      </div>
    </aside>
  );
};

export default LeftSideBar;
