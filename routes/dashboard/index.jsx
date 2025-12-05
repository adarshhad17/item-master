import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "../../components/Layout/DashboardLayout";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw redirect({ to: "/login" });
    }

    return {}; // 👈 required for safety
  },

  component: DashboardLayout,
});
