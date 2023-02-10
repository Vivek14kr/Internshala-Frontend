import { useContext, useEffect, useState } from "react";


import { useNavigate, Navigate } from "react-router-dom";
import { TokenContext } from "../context/tokenContext";
import { loadData } from "./localStorage";

export const PrivateRoute = ({ children }) => {
   
    const type = loadData('type')

  
  const navigate = useNavigate();
  if (type !== "agency" ) {
    return <Navigate to={"/"} />;
  }
  return children;
};
