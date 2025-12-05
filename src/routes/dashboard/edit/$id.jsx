import { createFileRoute } from "@tanstack/react-router";
import ItemFormPage from "../../../pages/ItemFormPage";

export const Route = createFileRoute("/dashboard/edit/$id")({
  component: ItemFormPage,
});
