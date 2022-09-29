/*
 * File: Layout.js
 * Project: answering-machine-detection-demo
 * File Created: Thursday, 29th September 2022 4:32:17 pm
 * Author: Subodh Jena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Thursday, 29th September 2022 4:43:51 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 symbl.ai, Symbl
 */

import React from "react";

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/config">Config</Link>
          </li>
          <li>
            <Link to="/404">404</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
