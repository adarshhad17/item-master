import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function DashboardHome() {
  const isLoggedIn = Boolean(sessionStorage.getItem("token"));

  return (
    <div className="
      relative min-h-screen w-full flex items-center justify-center
      px-5 py-10 overflow-hidden
      bg-linear-to-br from-black via-[#0b0b14] to-[#1b1430]
    ">

      {/* Soft Background Glow Elements */}
      <div className="
        absolute inset-0 -z-10 blur-[120px] opacity-40
        bg-linear-to-tr from-[#6e4cff] via-[#caa8ff] to-[#ffd98e]
      "></div>

      <div className="text-center max-w-[95%] sm:max-w-[550px] animate-fade-in">

        {/* Heading */}
        <h1
          className="
            font-extrabold leading-[1.15]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            bg-linear-to-r from-[#b298ff] via-[#e7d4ff] to-[#ffe7a4]
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(230,210,255,0.40)]
            animate-slide-down
          "
        >
          {isLoggedIn ? "Dashboard" : "Welcome Back"}
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-4 text-[#e6e1fa]/90 tracking-wide
            text-base sm:text-lg md:text-xl lg:text-2xl
            animate-fade-in opacity-90
          "
        >
          {isLoggedIn
            ? "Access your dashboard and manage everything easily"
            : "Let's continue your journey with a productive start"}
        </p>

        {/* CTA Button */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          className="
            mt-10 inline-flex items-center gap-3 font-semibold select-none
            text-lg sm:text-xl md:text-2xl
            text-transparent bg-clip-text 
            bg-linear-to-r from-[#c3adff] via-[#ecdfff] to-[#ffe7a4]
            transition-all duration-300 ease-out
            hover:opacity-90 hover:scale-[1.03]
            drop-shadow-[0_0_12px_rgba(240,220,255,0.40)]
            animate-slide-up
          "
        >
          {isLoggedIn ? "Go to Dashboard" : "Login"}

          <ArrowRightOutlined
            className="
              text-2xl sm:text-3xl
              text-transparent bg-clip-text
              bg-linear-to-r from-[#c3adff] via-[#ecdfff] to-[#ffe7a4]
            "
          />
        </Link>

      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 1s ease forwards;
          }
          .animate-slide-up {
            animation: slide-up 1.1s ease forwards;
          }
          .animate-slide-down {
            animation: slide-down 1s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
