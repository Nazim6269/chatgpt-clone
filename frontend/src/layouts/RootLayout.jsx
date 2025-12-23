import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { publishableKey } from "../../secret";
import Navbar from "../components/Navbar";

if (!publishableKey) {
  throw new Error("Missing Publishable Key");
}
//created a query client wrapper
const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className=" flex flex-col h-screen">
          {" "}
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
