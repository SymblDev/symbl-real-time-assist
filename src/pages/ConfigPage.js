/*
 * File: ConfigPage.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:01:26 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 7:24:37 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function ConfigPage(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <p className={classes.title}>Symbl</p>
        <div className={classes.containerBody}></div>
      </div>

      <div className={classes.container}>
        <p className={classes.title}>Twilio</p>
        <div className={classes.containerBody}></div>
      </div>

      <div className={classes.container}>
        <p className={classes.title}>Intents</p>
        <div className={classes.containerBody}></div>
      </div>

      <div className={classes.container}>
        <p className={classes.title}>Trackers</p>
        <div className={classes.containerBody}></div>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    padding: 10,
  },
  title: {},
  containerBody: {
    height: 30,
    backgroundColor: "red",
  },
});
