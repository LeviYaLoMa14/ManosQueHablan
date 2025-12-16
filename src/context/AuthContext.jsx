// src/context/AuthContext.jsx

// src/context/AuthContext.jsx

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "https://manos-hablan.fly.dev/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

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
    setCheckingSession(false);
  }, []);

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios.");
      }

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Credenciales inválidas");
      }

      const usuario = data.usuario;

      setUser(usuario);
      localStorage.setItem("mqh_user", JSON.stringify(usuario));

    } catch (err) {
      console.error("Error en login:", err);
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

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("mqh_user", JSON.stringify(newUser));
  };

  // Refrescar datos del usuario desde el servidor
  const refreshUser = async () => {
    if (!user?.id) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.id}`);
      const data = await res.json();
      
      if (res.ok && data.success && data.usuario) {
        updateUser(data.usuario);
      }
    } catch (err) {
      console.error("Error refrescando usuario:", err);
    }
  };

  if (checkingSession) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      refreshUser,
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/*
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Puedes cambiarla si algún día mueves la API
const API_BASE_URL = "https://manos-hablan.fly.dev/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // 1. NUEVO ESTADO: Empieza en true para bloquear la vista mientras leemos
  const [checkingSession, setCheckingSession] = useState(true);

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
    // 2. AVISAMOS QUE YA TERMINAMOS DE LEER
    setCheckingSession(false);
  }, []);

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios.");
      }

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Credenciales inválidas");
      }

      const usuario = data.usuario; 

      setUser(usuario);
      localStorage.setItem("mqh_user", JSON.stringify(usuario));

    } catch (err) {
      console.error("Error en login:", err);
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

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("mqh_user", JSON.stringify(newUser));
  };

  // 3. BLOQUEO DE SEGURIDAD
  // Si todavía estamos leyendo el localStorage, no mostramos la app (retornamos null o un spinner)
  // Esto evita que las Rutas Protegidas detecten user=null y te expulsen.
  if (checkingSession) {
    return null; // O puedes poner return <div>Cargando sesión...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
*/



/*
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Puedes cambiarla si algún día mueves la API
const API_BASE_URL = "https://manos-hablan.fly.dev/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // aquí guardamos el "usuario" real del back
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
      if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios.");
      }

      //  Llamada REAL a tu API
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // el back espera: { correo, contrasena }
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      });

      const data = await res.json().catch(() => null);

      // Manejo de errores según lo que hace tu backend
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Credenciales inválidas");
      }

      const usuario = data.usuario; // viene sin contraseña, perfecto

      setUser(usuario);
      localStorage.setItem("mqh_user", JSON.stringify(usuario));


    } catch (err) {
      console.error("Error en login:", err);
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
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("mqh_user", JSON.stringify(newUser));
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
*/