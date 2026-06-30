import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Send credentials to backend to login and receive the session cooktie
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    //setUser(response.data.user);
    try{
      const userReponse = await api.get('auth/me')
      setUser(userReponse.data.user);
      /* console.log("success AuthContext")
    console.log("Réponse API Login :", response.data); */
    }catch(err){
      console.error("Impossible de recuperer le profil apres le login",err)
      setUser(null)
      throw err;
    }
    return response.data;
  };

  // Tell the backend to cleat the session cookie
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
