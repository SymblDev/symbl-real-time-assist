/*
 * File: useAuth.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 4:32:42 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 4:40:22 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 nestworks.io, NestWorks
 */

import React, { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (user === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }

  return user;
};
