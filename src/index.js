import { ThemeProvider } from "@mui/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from './theme/index';

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
