// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, ... } o null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👇 Ajusta la URL a tu API real
  const API_BASE = "http://localhost:3000/api";

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // puedes cambiar email por username si tu API lo usa así
        body: JSON.stringify({ email, password }),
        credentials: "include", // por si usas sesiones de servidor
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas o error en el servidor");
      }

      const data = await res.json();
      // Esperamos algo tipo { user: { id, name, email } }
      setUser(data.user);
      return data.user;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Si tu API expone /logout puedes llamarla aquí
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // si no existe todavía, no pasa nada
    }
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
