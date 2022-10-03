/*
 * File: AuthProvider.js
 * Project: answering-machine-detection-demo
 * File Created: Monday, 3rd October 2022 4:30:11 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Monday, 3rd October 2022 4:47:36 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    setUser(currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
