import React from "react";
import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
