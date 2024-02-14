import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

// Created a tokenCheck function, unused for now.
export function CheckAuthentication(element: ReactNode) {
  return localStorage.getItem("accessToken") ? element : <Navigate to="/" />;
}
