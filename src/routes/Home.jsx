import { useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09022c] text-white">
      {/* Orbital background */}
      <img
        src="/orbital.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2
               w-130 sm:w-175 lg:w-250
               -translate-x-1/2 -translate-y-1/2
               opacity-20 sm:opacity-30
               animate-orbit-float"
      />

      {/* Main content */}
      <div
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col
                  items-center justify-center gap-16
                  px-4 sm:px-6 py-10
                  lg:flex-row lg:justify-between"
      >
        {/* LEFT */}
        <div className="flex max-w-xl flex-col gap-5 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Nazim AI
          </h1>

          <h2 className="text-lg sm:text-xl lg:text-2xl text-purple-300">
            Supercharge your creativity and productivity
          </h2>

          <h3 className="text-sm sm:text-base leading-relaxed text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
            sint dolorem doloribus, architecto dolor.
          </h3>

          <Link
            to="/dashboard"
            className="mx-auto lg:mx-0 w-full text-center rounded-xl border-2 border-purple-500
                   px-7 py-3 text-sm sm:text-base font-semibold text-purple-400
                   transition-all duration-300
                   hover:bg-purple-500 hover:text-white
                   hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
          >
            Get Started
          </Link>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">
          <div
            className="relative flex items-center justify-center
                   h-75 w-75
                   sm:h-90 sm:w-90
                   lg:h-105 lg:w-105"
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0 rounded-full
                     bg-linear-to-tr from-purple-600/30 via-blue-500/20 to-pink-500/30
                     blur-2xl sm:blur-3xl animate-bg-pulse"
            />

            {/* Bot image */}
            <img
              src="/bot.png"
              alt=""
              className="relative z-10
                     w-40 sm:w-52 lg:w-64
                     select-none animate-bot-float"
            />

            {/* Chat bubble */}
            <div
              className="absolute bottom-0 right-0 z-20
                     w-56 sm:w-64 lg:w-72
                     rounded-2xl bg-white/10 p-3 sm:p-4
                     backdrop-blur-xl flex gap-3"
            >
              <img
                src={
                  typingStatus === "human1"
                    ? "/human1.jpeg"
                    : typingStatus === "human2"
                    ? "/human2.jpeg"
                    : "/bot.png"
                }
                alt=""
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
              />

              <TypeAnimation
                sequence={[
                  "Human: We produce food for Mice",
                  2000,
                  () => setTypingStatus("bot"),
                  "Bot: We produce food for Hamsters",
                  2000,
                  () => setTypingStatus("human2"),
                  "Human2: We produce food for Guinea Pigs",
                  2000,
                  () => setTypingStatus("bot"),
                  "Bot: We produce food for Chinchillas",
                  2000,
                  () => setTypingStatus("human1"),
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor
                omitDeletionAnimation
                className="text-xs sm:text-sm text-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TERMS */}
      <div
        className="absolute bottom-4 left-1/2 z-10
               -translate-x-1/2 flex flex-col items-center gap-2
               text-xs sm:text-sm text-gray-400"
      >
        <img src="/logo.png" alt="" className="h-5 sm:h-6 opacity-80" />

        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-white">
            Terms of Service
          </Link>
          <span>|</span>
          <Link to="/" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
