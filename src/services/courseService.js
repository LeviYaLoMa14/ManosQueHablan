// src/services/courseService.js

const API_BASE_URL = "https://manos-hablan.fly.dev/api/v1";

const courseService = {
  // Obtener el progreso del usuario (módulo actual)
  async getProgress(userId) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al obtener progreso");
      }
      
      return data.usuario.modulo || 0;
    } catch (err) {
      console.error("Error obteniendo progreso:", err);
      return 0;
    }
  },

  // Actualizar el progreso del usuario (completar módulo)
  async updateProgress(userId, moduleNumber) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}/modulo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modulo: moduleNumber }),
      });
      
      // Intentar parsear la respuesta
      const text = await res.text();
      
      if (text) {
        const data = JSON.parse(text);
        if (res.ok && data.success && data.usuario) {
          return data.usuario;
        }
      }
      
      // Si no hay respuesta válida, obtener el usuario actualizado
      const userRes = await fetch(`${API_BASE_URL}/users/${userId}`);
      const userData = await userRes.json();
      
      if (userRes.ok && userData.success) {
        return userData.usuario;
      }
      
      throw new Error("Error al actualizar progreso");
    } catch (err) {
      console.error("Error actualizando progreso:", err);
      throw err;
    }
  },

  // Marcar módulo como completado
  async completeModule(userId, moduleNumber, currentProgress) {
    // Solo actualizar si el módulo completado es mayor al progreso actual
    if (moduleNumber > currentProgress) {
      return await this.updateProgress(userId, moduleNumber);
    }
    return null;
  },
};

export default courseService;