import { Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";
import Navbar from "../components/Layout/Navbar";
import NotFoundPage from "../pages/Notfound";

export const Route = createRootRoute({
  component: () => (
    <div>
      <Navbar />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <NotFoundPage/>,
});
