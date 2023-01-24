import React from "react";
import { Navigate } from "react-router-dom";
import { Helpers } from "./services/helpers";

const helpers = new Helpers();

const Protected = ({ children }) => {
  if (!helpers.getToken()) return <Navigate to="/login" />;

  return children;
};

export default Protected;
