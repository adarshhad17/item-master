import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAuth } from "../store/auth";

export default function HomePage() {
  const { user, logout } = useAuth(); // check if logged in

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      px-4 py-10 bg-linear-to-br from-black via-[#0b0b14] to-[#1b1430]"
    >
      <div className="text-center max-w-[90%] sm:max-w-[500px]">
        <h1
          className="font-extrabold
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            bg-linear-to-r from-[#9a7eff] via-[#cbb0ff] to-[#f5e09a]
            bg-clip-text text-transparent
            drop-shadow-[0_0_14px_rgba(220,200,255,0.35)]
            leading-tight"
        >
          {user ? `Welcome, ${user.username}` : "Welcome Back"}
        </h1>

        <p className="mt-4 text-[#e6e1fa] text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
          {user
            ? "Go to your dashboard to manage your items."
            : "Let's continue your journey"}
        </p>

        {user ? (
          <button
            onClick={logout}
            className="mt-10 px-6 py-3 rounded-full bg-linear-to-r from-[#b39aff] via-[#e7d4ff] to-[#f5e09a] font-semibold text-lg text-black hover:opacity-90 transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="mt-10 inline-flex items-center gap-3 
              text-transparent bg-clip-text
              bg-linear-to-r from-[#b39aff] via-[#e7d4ff] to-[#f5e09a]
              text-xl sm:text-2xl md:text-3xl font-bold
              hover:opacity-80 transition-all duration-200
              drop-shadow-[0_0_10px_rgba(230,210,255,0.35)]"
          >
            Login
            <ArrowRightOutlined
              className="text-2xl md:text-3xl text-transparent bg-clip-text
              bg-linear-to-r from-[#b39aff] via-[#e7d4ff] to-[#f5e09a]"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
