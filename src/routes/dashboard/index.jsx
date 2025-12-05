import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "../../components/Layout/DashboardLayout";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const token = localStorage.getItem("token");

    // ❌ If no token -> redirect to login
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },

  component: DashboardLayout,
});
