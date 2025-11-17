// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Al montar, intentamos leer el usuario guardado
  useEffect(() => {
    const stored = localStorage.getItem("mqh_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mqh_user");
      }
    }
  }, []);

  // 🔐 Login SIMULADO (sin API, sin tokens)
  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      // pequeña pausa para que se note el "cargando"
      await new Promise((res) => setTimeout(res, 500));

      // Aquí luego vas a llamar a tu API, por ahora solo simulamos:
      if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios");
      }

      const fakeUser = {
        email,
        name: "Usuario Registrado",
      };

      setUser(fakeUser);
      localStorage.setItem("mqh_user", JSON.stringify(fakeUser));
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Registro SIMULADO (opcional, por ahora solo inicia sesión directo)
  const register = async (formData) => {
    setLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 500));

      const fakeUser = {
        email: formData.email,
        name: formData.name || "Usuario Registrado",
        bio: formData.bio || "",
      };

      setUser(fakeUser);
      localStorage.setItem("mqh_user", JSON.stringify(fakeUser));
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo registrar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mqh_user");
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}


//AuthContext Con integracion API
/*
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar usuario desde localStorage (si ya había iniciado sesión)
  useEffect(() => {
    const stored = localStorage.getItem("mqh_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mqh_user");
      }
    }
  }, []);

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      // 🔸 Simulación de delay / validación
      await new Promise((res) => setTimeout(res, 800));

      // Aquí podrías hacer validaciones mínimas si quieres
      if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios.");
      }

      const fakeUser = {
        id: 1,
        name: "Usuario Registrado",
        email,
      };

      setUser(fakeUser);
      localStorage.setItem("mqh_user", JSON.stringify(fakeUser));

      // 🧷 Aquí iría la llamada REAL a tu API
      /Eliminar: Inicia coemntario*
      const response = await fetch("https://tu-api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("mqh_user", JSON.stringify(data.user));
      *Eliminar: Termina comentario/
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mqh_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
*/