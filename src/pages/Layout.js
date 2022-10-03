/*
 * File: Layout.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:02:38 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 2:47:51 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import ConfigPage from "./ConfigPage";

import { Appbar } from "../components/Appbar";

function Layout(props) {
  return (
    <div>
      <Appbar />
      <Router>
        <Switch>
          <Route path="/config">
            <ConfigPage name="Config" />
          </Route>
          <Route path="/">
            <HomePage name="Home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Layout;
