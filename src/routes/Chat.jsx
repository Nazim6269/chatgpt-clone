import InputBox from "../components/InputBox";

const Chat = () => {
  return (
    <div className="flex h-screen flex-col bg-[#0b022c] text-white">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Hello! How can I help you today?
        </div>

        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Explain Tailwind CSS Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas sed corrupti officiis enim molestias quos
          aliquid, illo quae omnis debitis ipsum repellat dolores inventore
          aperiam repudiandae hic assumenda corporis possimus!
        </div>

        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Tailwind CSS is a utility-first CSS framework...
        </div>

        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Explain Tailwind CSS Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas sed corrupti officiis enim molestias quos
          aliquid, illo quae omnis debitis ipsum repellat dolores inventore
          aperiam repudiandae hic assumenda corporis possimus!
        </div>

        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Tailwind CSS is a utility-first CSS framework...
        </div>
        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Explain Tailwind CSS Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas sed corrupti officiis enim molestias quos
          aliquid, illo quae omnis debitis ipsum repellat dolores inventore
          aperiam repudiandae hic assumenda corporis possimus!
        </div>

        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Tailwind CSS is a utility-first CSS framework...
        </div>
        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Explain Tailwind CSS Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas sed corrupti officiis enim molestias quos
          aliquid, illo quae omnis debitis ipsum repellat dolores inventore
          aperiam repudiandae hic assumenda corporis possimus!
        </div>

        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Tailwind CSS is a utility-first CSS framework...
        </div>
        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Explain Tailwind CSS Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas sed corrupti officiis enim molestias quos
          aliquid, illo quae omnis debitis ipsum repellat dolores inventore
          aperiam repudiandae hic assumenda corporis possimus!
        </div>

        {/* AI message */}
        <div className="max-w-xl rounded-2xl bg-white/10 px-4 py-2 text-gray-200">
          Tailwind CSS is a utility-first CSS framework...
        </div>
        {/* User message */}
        <div className="max-w-xl rounded-2xl bg-purple-600/30 px-4 py-2 text-white ml-auto">
          Got it, thanks!
        </div>
      </div>

      {/* Input box */}
      <div className="border-t border-white/10 p-4 absolute bottom-0 sm:w-lg">
        <InputBox />
      </div>
    </div>
  );
};

export default Chat;
