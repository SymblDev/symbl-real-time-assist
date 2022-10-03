/*
 * File: ConfigPage.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:01:26 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 8:02:43 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ConfigPage(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <p className={classes.title}>Symbl</p>
          <div className={classes.containerBody} noValidate>
            <TextField id="symbl_url" label="URL" variant="outlined" />
            <span className={classes.separator}></span>
            <TextField id="symbl_app_id" label="App Id" variant="outlined" />
            <span className={classes.separator}></span>
            <TextField
              id="symbl_app_sectet"
              label="App Secret"
              variant="outlined"
            />
          </div>
        </div>

        <div className={classes.container}>
          <p className={classes.title}>Twilio Bridge</p>
          <div className={classes.containerBody} noValidate>
            <TextField id="twilio_bridge_url" label="URL" variant="outlined" />
          </div>
        </div>
      </div>

      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <p className={classes.title}>Intents</p>
          <div className={classes.containerBody}></div>
        </div>

        <div className={classes.container}>
          <p className={classes.title}>Trackers</p>
          <div className={classes.containerBody}></div>
        </div>
      </div>

      <div className={classes.container}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
  },
  container: {
    padding: 10,
    width: "100%",
  },
  title: {},
  containerBody: {
    display: "flex",
    flexDirection: "column",
  },
  separator: {
    height: 10,
  },
});
