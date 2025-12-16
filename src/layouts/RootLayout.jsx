import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="">
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
