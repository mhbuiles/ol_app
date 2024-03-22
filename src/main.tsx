import { App } from "./app";
import { AppProviders } from "./context";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@components/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
      <Toaster />
    </AppProviders>
  </React.StrictMode>,
);
