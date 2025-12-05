import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function DashboardHome() {
  const isLoggedIn = Boolean(sessionStorage.getItem("token"));

  return (
    <div className="
      relative min-h-screen w-full flex items-center justify-center
      px-6 py-12 overflow-hidden bg-[#0A0A12]
    ">
      <div className="
        absolute inset-0 -z-10 blur-[140px] opacity-35
        bg-linear-to-br from-[#4f29ff] via-[#7133ff] to-[#ff9f80]
      "></div>

      <div className="
        text-center max-w-[95%] sm:max-w-[600px]
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl p-10 shadow-[0_0_40px_rgba(120,70,255,0.25)]
        animate-fade-in
      ">
        <h1 className="
          font-extrabold leading-tight
          text-4xl sm:text-5xl md:text-6xl
          bg-linear-to-r from-[#c6baff] via-[#f3e9ff] to-[#ffddb1]
          bg-clip-text text-transparent
        ">
          {isLoggedIn ? "Dashboard" : "Welcome Back ✨"}
        </h1>

        <p className="mt-4 text-[#E8E6FF]/85 tracking-wide text-lg sm:text-xl">
          {isLoggedIn
            ? "Manage your items, sales, and inventory easily."
            : "Sign in and continue your productivity journey 🚀"}
        </p>

        <Link
          to={isLoggedIn ? "/dashboard/items" : "/login"}
          className="
            mt-10 inline-flex items-center gap-3 font-semibold
            text-lg sm:text-xl px-6 py-3 rounded-xl
            bg-linear-to-r from-[#744bfa] via-[#8d68ff] to-[#ffb27a]
            text-white shadow-lg shadow-[#744bfa]/40
            transition-all duration-300
            hover:scale-[1.05] hover:shadow-xl hover:shadow-[#8d68ff]/60
          "
        >
          {isLoggedIn ? "Go to Items" : "Login"}

          <ArrowRightOutlined className="text-2xl" />
        </Link>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
