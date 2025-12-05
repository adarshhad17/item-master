import { createFileRoute, redirect } from "@tanstack/react-router";
import ItemsPage from "../../pages/ItemsPage";

export const Route = createFileRoute("/dashboard/items")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw redirect({ to: "/login" });
    }

    return {};
  },

  component: ItemsPage,
});
