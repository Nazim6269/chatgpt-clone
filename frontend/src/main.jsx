import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./layouts/DashboardLayout";
import RootLayout from "./layouts/RootLayout";
import Chat from "./routes/Chat";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sign-in/*",
        element: <Signin />,
      },
      {
        path: "sign-up/*",
        element: <Signup />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "dashboard/chats/:id",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
