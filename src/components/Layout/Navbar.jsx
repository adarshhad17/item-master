import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../store/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="
        w-full bg-[#050505]/95 text-white
        shadow-[0_0_20px_rgba(0,0,0,0.6)] 
        border-b border-[#1a1a1a]
        sticky top-0 z-50
      "
    >
      <div className="flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold tracking-wide 
          hover:text-[#a57cff] transition-colors duration-200"
        >
          Item Master
        </Link>

        <div className="hidden md:flex items-center gap-6">

          <div className="h-6 border-r border-[#2a2a2a]"></div>

          {token ? (
            <button
              onClick={() => {
                logout();
                navigate({ to: "/login" }); // 👈 correct
              }}
              className="
                flex items-center gap-2
                text-[#ff4d4d] hover:text-[#ff6b6b]
                font-medium transition
              "
            >
              <LogoutOutlined /> Logout
            </button>
          ) : (
            <Link to="/login">
              <span
                className="
                  text-[#cfcfcf] hover:text-white 
                  transition font-medium
                "
              >
                Login
              </span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      <div
        className={`
          md:hidden flex flex-col gap-4 px-6 pb-4 
          transition-all duration-300
          ${open ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}
        `}
      >
        <Link
          to="/"
          className="text-lg hover:text-[#a57cff] transition"
          onClick={() => setOpen(false)}
        >
          Home
        </Link>

        {token ? (
          <button
            onClick={() => {
              logout();
              setOpen(false);
              navigate({ to: "/login" }); 
            }}
            className="
              flex items-center gap-2
              text-[#ff4d4d] hover:text-[#ff6b6b]
              text-lg transition
            "
          >
            <LogoutOutlined /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-lg hover:text-[#a57cff] transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
