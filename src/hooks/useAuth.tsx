import { useState, useCallback, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const validUser = {
    email: "jose@gmail.com",
    password: "123",
  };

  const login = useCallback((email: string, password: string) => {
    if (email === validUser.email && password === validUser.password) {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      return true;
    } else {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn.toString());
  }, [loggedIn]);

  return { loggedIn, login, logout };
};

export default useAuth;
