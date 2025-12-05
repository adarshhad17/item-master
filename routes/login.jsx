import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../pages/auth/Login";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      throw redirect({ to: "/dashboard" });
    }
  },

  component: LoginPage,
});
