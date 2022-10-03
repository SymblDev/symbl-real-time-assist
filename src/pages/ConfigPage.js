/*
 * File: ConfigPage.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:01:26 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 7:54:48 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function ConfigPage(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <p className={classes.title}>Symbl</p>
          <form className={classes.containerBody} noValidate>
            <TextField id="standard-basic" label="URL" variant="outlined" />
            <span className={classes.separator}></span>
            <TextField id="standard-basic" label="AppId" variant="outlined" />
            <span className={classes.separator}></span>
            <TextField
              id="standard-basic"
              label="AppSecret"
              variant="outlined"
            />
          </form>
        </div>

        <div className={classes.container}>
          <p className={classes.title}>Twilio Bridge</p>
          <form className={classes.containerBody} noValidate>
            <TextField id="standard-basic" label="URL" variant="outlined" />
          </form>
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
