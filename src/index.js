import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import theme from "./Theme";
import Layout from "./pages/Layout";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
