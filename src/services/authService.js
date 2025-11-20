// src/services/authService.js
import { apiFetch } from "./apiClient";

const authService = {
  async login(correo, contrasena) {
    // POST /api/v1/auth/login  con { correo, contrasena }
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, contrasena }),
    });

    // el backend responde { success, message, usuario }
    if (!data.success || !data.usuario) {
      throw new Error(data.message || "Credenciales inválidas");
    }

    return data.usuario;
  },

  async register({ nombre_completo, descripcion, correo, contrasena }) {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        nombre_completo,
        descripcion,
        correo,
        contrasena,
      }),
    });

    if (!data.success || !data.usuario) {
      throw new Error(data.message || "Error al registrarse");
    }

    return data.usuario;
  },
};

export default authService;
