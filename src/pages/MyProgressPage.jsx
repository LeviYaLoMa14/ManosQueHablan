// src/pages/MyProgressPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function MyProgressPage() {
  const navigate = useNavigate();

  // Datos simulados de progreso
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
    navigate(`/courses/${id}`);
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-700 text-center mb-8">
          Tu Progreso en el Curso:
        </h1>

        {/* Barra de progreso grande */}
        <div className="w-full bg-[#F6F1E8] rounded-full h-12 flex items-center mb-10">
          <div
            className="h-12 rounded-full bg-[#C07B4F] flex items-center justify-center text-white text-lg font-semibold"
            style={{ width: `${totalProgress}%` }}
          >
            {totalProgress}% Completado
          </div>
        </div>

        {/* Lista de módulos */}
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
                  {/* Icono circular tipo estado */}
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

                {/* Derecha: botón de acción */}
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
