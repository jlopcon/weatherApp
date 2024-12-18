import React, { createContext, useContext, ReactNode } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
