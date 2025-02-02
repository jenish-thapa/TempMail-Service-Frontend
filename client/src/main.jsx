import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </Router>

    {/* <ReactQueryDevtools buttonPosition="top-left" /> */}
  </QueryClientProvider>
);
