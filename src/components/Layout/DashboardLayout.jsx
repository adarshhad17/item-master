import React from "react";
import { Outlet, Link, useRouterState } from "@tanstack/react-router";

export default function DashboardLayout() {
  const state = useRouterState();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all
     ${state.location.pathname === path 
       ? "bg-[#222] text-white" 
       : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"}`;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* SMALL MENU BAR */}
      <nav className="bg-[#0d0d0d] border-b border-[#222] px-6 py-2 flex gap-3">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Overview
        </Link>

        <Link to="/dashboard/items" className={linkClass("/dashboard/items")}>
          Item List
        </Link>

        <Link to="/dashboard/add" className={linkClass("/dashboard/add")}>
          Add Item
        </Link>
      </nav>

      {/* PAGE CONTENT */}
      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
}
