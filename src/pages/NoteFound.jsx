import React from "react";
import { WarningOutlined } from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center
      bg-linear-to-br from-black via-[#0d0b16] to-[#1a1330]
      px-6 text-center">

      <div className="text-[#a26bff] mb-4">
        <WarningOutlined className="text-6xl sm:text-7xl md:text-8xl" />
      </div>

      <h2 className="text-[#b48cff] font-bold 
        text-3xl sm:text-4xl md:text-5xl">
        Error 404
      </h2>

      <h1 className="text-[#c9a6ff] font-extrabold
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1">
        Page Not Found
      </h1>

      <p className="mt-4 text-[#e2d4ff] text-base sm:text-lg md:text-xl">
        The page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="mt-6 text-[#b88dff] text-lg sm:text-xl font-medium 
        hover:text-white transition-all duration-200"
      >
        ← Back to Home
      </a>
    </div>
  );
}
