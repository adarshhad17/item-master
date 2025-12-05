import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 👇 Create QueryClient
const queryClient = new QueryClient();

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 👇 Wrap app with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
