import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import theme from "./Theme";

import Layout from "./pages/Layout";
import { AuthProvider } from "./contexts/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
