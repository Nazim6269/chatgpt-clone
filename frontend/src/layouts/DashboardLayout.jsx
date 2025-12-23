import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { serverUrl } from "../../secret";
import LeftSideBar from "../components/LeftSideBar";

/**
 * Temporary mock data
 * Replace with API response once backend is finalized
 */
const CHAT_MOCKS = [
  { id: 1, title: "Build a chatbot UI" },
  { id: 2, title: "Explain React hooks" },
  { id: 3, title: "Tailwind gradients" },
];

/**
 * Fetch user chats from server
 */
const fetchUserChats = async () => {
  const response = await fetch(`${serverUrl}/api/userChats`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user chats");
  }

  return response.json();
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isLoaded, userId } = useAuth();
  const [activeChat, setActiveChat] = useState(CHAT_MOCKS[0]);

  const {
    data: chats,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-chats"],
    queryFn: fetchUserChats,
    enabled: isLoaded && !!userId, // thsi will prevent unnecessary calls
  });

  /**
   * Redirect unauthenticated users
   */
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in", { replace: true });
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded || isPending) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b022c] text-white">
      <LeftSideBar
        chats={chats ?? CHAT_MOCKS}
        activeChat={activeChat}
        onActiveChat={setActiveChat}
      />

      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
