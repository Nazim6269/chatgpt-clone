import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

const chatsMock = [
  { id: 1, title: "Build a chatbot UI" },
  { id: 2, title: "Explain React hooks" },
  { id: 3, title: "Tailwind gradients" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isLoaded, userId } = useAuth();

  const [activeChat, setActiveChat] = useState(chatsMock[0]);

  const handleActiveChat = (chat) => {
    setActiveChat(chat);
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";
  return (
    <div className="flex bg-[#0b022c] text-white">
      <LeftSideBar
        activeChat={activeChat}
        chatsMock={chatsMock}
        onActiveChat={handleActiveChat}
      />
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
