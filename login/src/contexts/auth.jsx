import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log("login auth", { email, password });

    const response = await createSession(email, password);
    console.log("login", response.data);

    // api cria uma session
    const loggerdUser = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", JSON.stringify(loggerdUser));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorizathion = `Bearer ${token}`;

    setUser(loggerdUser);
    navigate("/");
  };

  const logout = () => {
    console.log("logout");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    api.defaults.headers.Authorizathion = null;
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
