// src/pages/MyProgressPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function MyProgressPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // obtenemos el usuario logueado

  // Si por alguna razón se llega aquí sin usuario (no debería por RequireAuth),
  // mostramos un mensaje sencillo
  if (!user) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-600">
          Necesitas iniciar sesión para ver tu progreso.
        </p>
      </main>
    );
  }

  // 🔹 Datos simulados de progreso
  const totalProgress = 65; // %

  const modules = [
    {
      id: 1,
      title: "Módulo 1: Introducción a LSM",
      subtitle: "Temas básicos y alfabeto",
      status: "completed", // completed | in_progress | locked
      actionLabel: "Revisar",
    },
    {
      id: 2,
      title: "Módulo 2: Frases cotidianas",
      subtitle: "Conversaciones del día a día",
      status: "in_progress",
      actionLabel: "Continuar",
    },
    {
      id: 3,
      title: "Módulo 3: Contextos Sociales",
      subtitle: "Interacción en la comunidad",
      status: "locked",
      actionLabel: "Bloqueado",
    },
  ];

  const goToModule = (id, status) => {
    if (status === "locked") return;
    // Por ahora solo simulación: la ruta /courses/:id la puedes hacer después
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
          Tu Progreso en el Curso:
        </h1>

        {/* Barra de progreso grande */}
        <div className="w-full bg-[#F6F1E8] rounded-full h-12 flex items-center mb-10 overflow-hidden">
          <div
            className="h-12 rounded-full bg-[#C07B4F] flex items-center justify-center text-white text-lg font-semibold transition-all"
            style={{ width: `${totalProgress}%` }}
          >
            {totalProgress}% Completado
          </div>
        </div>

        {/* Lista de módulos (simulados) */}
        <div className="space-y-4">
          {modules.map((mod) => {
            const isLocked = mod.status === "locked";
            const isCompleted = mod.status === "completed";
            const isInProgress = mod.status === "in_progress";

            return (
              <div
                key={mod.id}
                className={[
                  "flex items-center justify-between px-6 py-4 rounded-2xl bg-[#F6F1E8]",
                  isInProgress ? "border-2 border-[#C07B4F]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Izquierda: icono + textos */}
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      isCompleted
                        ? "bg-[#C07B4F] text-white"
                        : isInProgress
                        ? "border-2 border-[#C07B4F] bg-white text-[#C07B4F]"
                        : "border-2 border-stone-300 bg-white text-stone-400",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isCompleted ? "✓" : isInProgress ? "◔" : "○"}
                  </div>

                  <div>
                    <p className="font-semibold text-stone-800">
                      {mod.title}
                    </p>
                    <p className="text-sm text-stone-600">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                {/* Derecha: botón */}
                <div>
                  <button
                    onClick={() => goToModule(mod.id, mod.status)}
                    disabled={isLocked}
                    className={[
                      "px-6 py-2 rounded-full text-sm font-semibold transition-colors",
                      isLocked
                        ? "bg-stone-400 text-white cursor-not-allowed opacity-90"
                        : "bg-[#C07B4F] text-white hover:bg-[#a96b42]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {mod.actionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default MyProgressPage;
