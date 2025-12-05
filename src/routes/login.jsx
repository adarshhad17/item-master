import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../pages/Login";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = localStorage.getItem("token");

    // If already logged in → redirect to dashboard
    if (token) {
      throw redirect({ to: "/dashboard" });
    }
  },

  component: LoginPage,
});
