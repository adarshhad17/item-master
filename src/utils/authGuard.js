import { redirect } from "@tanstack/react-router";

export function authGuard() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw redirect({ to: "/login" });
  }
}
