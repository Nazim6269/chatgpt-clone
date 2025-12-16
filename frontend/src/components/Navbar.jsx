import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="  fixed top-0 w-full bg-[#09022c] text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          <Link to={"/"}>
            {" "}
            Nazim<span className="text-purple-400">AI</span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        {/* <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li className="hover:text-purple-400 transition">Home</li>
          <li className="hover:text-purple-400 transition">Projects</li>
          <li className="hover:text-purple-400 transition">Skills</li>
          <li className="hover:text-purple-400 transition">Contact</li>
        </ul> */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0f053a] px-6 py-4 space-y-4">
          <p className="hover:text-purple-400">Home</p>
          <p className="hover:text-purple-400">Projects</p>
          <p className="hover:text-purple-400">Skills</p>
          <p className="hover:text-purple-400">Contact</p>
          <button className="w-full py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500">
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}
