// src/pages/MyProgressPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { modulesData } from "../data/modulesData.js";
import courseService from "../services/courseService.js";

function MyProgressPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [userProgress, setUserProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar progreso del usuario
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        try {
          // El progreso viene del usuario (campo modulo)
          const progress = user.modulo || 0;
          setUserProgress(progress);
        } catch (err) {
          console.error("Error cargando progreso:", err);
        }
      }
      setLoading(false);
    };
    loadProgress();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-600">
          Necesitas iniciar sesión para ver tu progreso.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-600">Cargando progreso...</p>
      </main>
    );
  }

  // Calcular progreso total (porcentaje basado en módulos completados)
  const totalModules = modulesData.length;
  const totalProgress = Math.round((userProgress / totalModules) * 100);

  // Determinar estado de cada módulo
  const getModuleStatus = (moduleId) => {
    if (moduleId <= userProgress) return "completed";
    if (moduleId === userProgress + 1) return "in_progress";
    return "locked";
  };

  const getActionLabel = (status) => {
    switch (status) {
      case "completed": return "Revisar";
      case "in_progress": return "Continuar";
      default: return "Bloqueado";
    }
  };

  const goToModule = (id, status) => {
    if (status === "locked") return;
    navigate(`/courses/${id}`);
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Encabezado con saludo */}
        <h2 className="text-lg text-stone-500 mb-2 text-center md:text-left">
          Hola,{" "}
          <span className="font-semibold text-stone-700">
            {user.nombre_completo || user.correo}
          </span>
        </h2>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-700 text-center mb-8">
          Tu Progreso en el Curso de LSM
        </h1>

        {/* Barra de progreso grande */}
        <div className="w-full bg-[#F6F1E8] rounded-full h-12 flex items-center mb-4 overflow-hidden">
          <div
            className="h-12 rounded-full bg-[#C07B4F] flex items-center justify-center text-white text-lg font-semibold transition-all duration-500"
            style={{ width: `${Math.max(totalProgress, 8)}%` }}
          >
            {totalProgress}%
          </div>
        </div>
        
        <p className="text-center text-stone-600 mb-10">
          {userProgress} de {totalModules} módulos completados
        </p>

        {/* Lista de módulos */}
        <div className="space-y-4">
          {modulesData.map((mod) => {
            const status = getModuleStatus(mod.id);
            const isLocked = status === "locked";
            const isCompleted = status === "completed";
            const isInProgress = status === "in_progress";

            return (
              <div
                key={mod.id}
                className={[
                  "flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 rounded-2xl bg-[#F6F1E8] gap-4",
                  isInProgress ? "border-2 border-[#C07B4F] shadow-md" : "",
                  isLocked ? "opacity-60" : "",
                ].filter(Boolean).join(" ")}
              >
                {/* Izquierda: icono + textos */}
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0",
                      isCompleted
                        ? "bg-[#C07B4F] text-white"
                        : isInProgress
                        ? "border-2 border-[#C07B4F] bg-white text-[#C07B4F]"
                        : "border-2 border-stone-300 bg-white text-stone-400",
                    ].filter(Boolean).join(" ")}
                  >
                    {isCompleted ? "✓" : mod.id}
                  </div>

                  <div>
                    <p className="font-semibold text-stone-800">
                      Módulo {mod.id}: {mod.title}
                    </p>
                    <p className="text-sm text-stone-600">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                {/* Derecha: botón */}
                <div className="flex justify-end sm:justify-start">
                  <button
                    onClick={() => goToModule(mod.id, status)}
                    disabled={isLocked}
                    className={[
                      "px-6 py-2 rounded-full text-sm font-semibold transition-colors",
                      isLocked
                        ? "bg-stone-400 text-white cursor-not-allowed"
                        : "bg-[#C07B4F] text-white hover:bg-[#a96b42]",
                    ].filter(Boolean).join(" ")}
                  >
                    {getActionLabel(status)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje de completado */}
        {userProgress >= totalModules && (
          <div className="mt-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center">
            <p className="text-2xl font-bold text-green-700 mb-2">🎉 ¡Felicidades!</p>
            <p className="text-green-600">
              Has completado todos los módulos del curso de Lengua de Señas Mexicana.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyProgressPage;