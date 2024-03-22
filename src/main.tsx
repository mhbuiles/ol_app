import { App } from "./app";
import { AppProviders } from "./context";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@components/toaster";

Chart.register(CategoryScale);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
      <Toaster />
    </AppProviders>
  </React.StrictMode>,
);
