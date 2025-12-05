import { createFileRoute, redirect } from "@tanstack/react-router";
import ItemFormPage from "../../pages/ItemFormPage";

export const Route = createFileRoute("/dashboard/create")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw redirect({ to: "/login" });
    }

    return {};
  },

  component: ItemFormPage,
});
