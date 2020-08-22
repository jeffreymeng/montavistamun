import "./src/css/style.css";
import { AuthProvider } from "./src/context/AuthContext";
import React from "react";

/**
 *
 * @param element ReactElement
 * @returns ReactElement
 */
// eslint-disable-next-line
// @ts-ignore
export const wrapRootElement = ({ element }) => (
	<AuthProvider>{element}</AuthProvider>
);
