/*
 * File: HomePage.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 1:01:19 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 7:37:12 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

function HomePage(props) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect replace to="/config" />;
  }

  return <h1>Hello, {props.name}</h1>;
}

export default HomePage;
