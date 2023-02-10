import { createContext } from "react";
import { useState } from "react";
import { loadData } from "../components/localStorage";

export const TokenContext = createContext({ token: "", handleToken: () => {} });

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const handleToken = (token) => {

    let newtoken = loadData("token")

    if (newtoken){
        setToken(newtoken)
        
    }
    setToken(token);
  };
  return (
    <TokenContext.Provider value={{ token, handleToken }}>
      {children}
    </TokenContext.Provider>
  );
};
