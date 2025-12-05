import { redirect } from "@tanstack/react-router";

export function authGuard() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect({ to: "/login" });
  }
}
