import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  // 👇 Check login using token
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      px-4 py-10 bg-linear-to-br 
      from-black via-[#0b0b14] to-[#1b1430]"
    >
      <div className="text-center max-w-[90%] sm:max-w-[500px]">

        {/* Heading */}
        <h1
          className="
            font-extrabold
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            bg-linear-to-r from-[#9a7eff] via-[#cbb0ff] to-[#f5e09a]
            bg-clip-text text-transparent
            drop-shadow-[0_0_14px_rgba(220,200,255,0.35)]
            leading-tight
          "
        >
          {isLoggedIn ? "Dashboard" : "Welcome Back"}
        </h1>

        {/* Subtext */}
        <p
          className="
          mt-4 text-[#e6e1fa]
          text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide
          "
        >
          {isLoggedIn
            ? "Explore your dashboard"
            : "Let's continue your journey"}
        </p>

        {/* Button */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          className="
            mt-10 inline-flex items-center gap-3 
            text-transparent bg-clip-text
            bg-linear-to-r from-[#b39aff] via-[#e7d4ff] to-[#f5e09a]
            text-xl sm:text-2xl md:text-3xl font-bold
            hover:opacity-80 transition-all duration-200
            drop-shadow-[0_0_10px_rgba(230,210,255,0.35)]
          "
        >
          {isLoggedIn ? "Go to Dashboard" : "Login"}
          <ArrowRightOutlined
            className="
              text-2xl md:text-3xl 
              text-transparent bg-clip-text
              bg-linear-to-r from-[#b39aff] via-[#e7d4ff] to-[#f5e09a]
            "
          />
        </Link>

      </div>
    </div>
  );
}
