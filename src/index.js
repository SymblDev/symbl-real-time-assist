import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import theme from "./Theme";
import Layout from "./pages/Layout";
import { Appbar } from "./components/Appbar";
import MainContainer from "./components/MainContainer";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Appbar />
      <MainContainer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
