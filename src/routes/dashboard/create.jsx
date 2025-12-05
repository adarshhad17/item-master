import { createFileRoute, redirect } from "@tanstack/react-router";
import ItemFormPage from "../../pages/ItemFormPage.jsx";

export const Route = createFileRoute("/dashboard/create")({
  beforeLoad: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw redirect({ to: "/login" });
    }
  },

  component: ItemFormPage,
});
