/*
 * File: Layout.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:02:38 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 6:13:42 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import HomePage from "./HomePage";
import ConfigPage from "./ConfigPage";
import { Appbar } from "../components/Appbar";

export default function Layout(props) {
  const classes = useStyles();

  return (
    <>
      <Appbar />
      <div className={classes.root}>
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
    </>
  );
}

const useStyles = makeStyles({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
