import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "../../components/Layout/DashboardLayout";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw redirect({ to: "/login" });
    }

    // When hit /dashboard -> go to /dashboard/items
    if (window.location.pathname === "/dashboard") {
      throw redirect({ to: "/dashboard/items" });
    }

    return {};
  },

  component: DashboardLayout,
});
