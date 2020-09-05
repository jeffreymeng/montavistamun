import "./src/css/style.css";
import { AuthProvider } from "./src/context/AuthContext";
import React, { useState } from "react";

/**
 *
 * @param element ReactElement
 * @returns ReactElement
 */
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
	<AuthProvider>{element}</AuthProvider>
);
