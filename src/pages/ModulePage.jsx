// src/pages/ModulePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getModuleById, customImages, alphabetDescriptions, alphabet, getYoutubeEmbedUrl } from "../data/modulesData.js";
import QuizComponent from "../components/course/QuizComponent.jsx";
import courseService from "../services/courseService.js";

function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState("content"); // content | quiz
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [saving, setSaving] = useState(false);

  const module = getModuleById(id);
  const userProgress = user?.modulo || 0;

  // Verificar acceso al módulo
  useEffect(() => {
    if (!module) {
      navigate("/progress");
      return;
    }
    // Si el módulo está bloqueado (más de 1 adelante del progreso)
    if (module.id > userProgress + 1) {
      navigate("/progress");
    }
  }, [module, userProgress, navigate]);

  if (!module) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-600">Módulo no encontrado</p>
      </main>
    );
  }

  const isModuleCompleted = module.id <= userProgress;

 const handleQuizComplete = async (passed) => {
  console.log("Quiz completado:", { passed, isModuleCompleted, userId: user.id, moduleId: module.id, userProgress });
  
  if (passed && !isModuleCompleted) {
    setSaving(true);
    try {
      const updatedUser = await courseService.completeModule(user.id, module.id, userProgress);
      console.log("Usuario actualizado:", updatedUser);  // <-- Agrega esto
      if (updatedUser) {
        updateUser(updatedUser);
      }
      setQuizCompleted(true);
    } catch (err) {
      console.error("Error guardando progreso:", err);
    } finally {
      setSaving(false);
    }
  } else if (passed) {
    setQuizCompleted(true);
  }
};

  const goToNextModule = () => {
    if (module.id < 9) {
      navigate(`/courses/${module.id + 1}`);
      setActiveTab("content");
      setQuizCompleted(false);
    } else {
      navigate("/progress");
    }
  };

  const goBack = () => {
    navigate("/progress");
  };

  // Renderizar contenido según el tipo de módulo
  const renderContent = () => {
    const { content } = module;

    // Módulo 1: Alfabeto
    if (content.type === "alphabet") {
      return (
        <div>
          {/* Tips */}
          <div className="bg-amber-50 border-l-4 border-[#C07B4F] p-4 mb-8 rounded-r-lg">
            <h3 className="font-bold text-[#C07B4F] mb-2">💡 Consejos:</h3>
            <ul className="list-disc pl-5 space-y-1 text-stone-700">
              {content.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Alfabeto Grid */}
          <h3 className="text-xl font-bold text-stone-700 mb-4">Alfabeto Dactilológico</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {alphabet.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className="bg-stone-100 rounded-lg p-2 flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-[#F0E6DA] hover:shadow-md transition-all"
              >
                <img
                  src={customImages[letter] || `https://placehold.co/80x80/C07B4F/FFFFFF?text=${letter}`}
                  alt={`Letra ${letter}`}
                  className="w-full h-auto object-cover rounded-md"
                />
                <p className="mt-1 font-bold text-stone-700">{letter}</p>
              </button>
            ))}
          </div>

          {/* Modal para letra seleccionada */}
          {selectedLetter && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedLetter(null)}
            >
              <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-sm relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-3 -right-3 bg-[#C07B4F] text-white rounded-full h-8 w-8 flex items-center justify-center shadow-lg"
                  onClick={() => setSelectedLetter(null)}
                >
                  ×
                </button>
                <div className="p-6 text-center">
                  <img
                    src={customImages[selectedLetter] || `https://placehold.co/300x300/C07B4F/FFFFFF?text=${selectedLetter}`}
                    alt={`Letra ${selectedLetter}`}
                    className="w-full h-auto object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#C07B4F] mb-2">{selectedLetter}</h3>
                  <p className="text-stone-700">
                    {alphabetDescriptions[selectedLetter] || `Letra ${selectedLetter} en LSM.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Módulos con lecciones (videos/imágenes)
    if (content.type === "lessons") {
      return (
        <div>
          {/* Intro si existe */}
          {content.intro && (
            <p className="text-stone-600 mb-6">{content.intro}</p>
          )}

          {/* Videos principales si existen (módulo 9) */}
          {content.videos && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-700 mb-4">Videos de referencia</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {content.videos.map((video, i) => {
                  const embedUrl = getYoutubeEmbedUrl(video.url);
                  return (
                    <div key={i} className="bg-stone-50 rounded-lg overflow-hidden">
                      {embedUrl && (
                        <div className="aspect-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="font-bold text-stone-800">{video.title}</h4>
                        <p className="text-sm text-stone-600">{video.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lista de lecciones */}
          <h3 className="text-xl font-bold text-stone-700 mb-4">Vocabulario</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.lessons.map((lesson, i) => {
              const embedUrl = lesson.video ? getYoutubeEmbedUrl(lesson.video) : null;
              
              return (
                <div key={i} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Media (video o imagen) */}
                  <div className="aspect-video bg-stone-100 flex items-center justify-center">
                    {embedUrl ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title={lesson.term}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : lesson.image ? (
                      <img
                        src={lesson.image}
                        alt={lesson.term}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-4xl">🤟</div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-[#C07B4F] mb-2">{lesson.term}</h4>
                    <p className="text-sm text-stone-600">{lesson.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <p>Contenido no disponible</p>;
  };

  return (
    <main className="min-h-[80vh] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="text-[#C07B4F] hover:underline mb-4 flex items-center gap-2"
          >
            ← Volver a mi progreso
          </button>
          
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <span className="bg-[#C07B4F] text-white px-4 py-1 rounded-full text-sm font-semibold">
              Módulo {module.id}
            </span>
            {isModuleCompleted && (
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                ✓ Completado
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">
            {module.title}
          </h1>
          <p className="text-stone-600 text-lg">{module.objective}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab("content")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "content"
                ? "text-[#C07B4F] border-b-2 border-[#C07B4F]"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            📚 Contenido
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "quiz"
                ? "text-[#C07B4F] border-b-2 border-[#C07B4F]"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            ✍️ Ejercicios
          </button>
        </div>

        {/* Content */}
        {activeTab === "content" ? (
          <div>
            {renderContent()}
            
            {/* Botón para ir al quiz */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveTab("quiz")}
                className="bg-[#C07B4F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a96b42] transition-colors"
              >
                Ir a los ejercicios →
              </button>
            </div>
          </div>
        ) : (
          <div>
            {quizCompleted || isModuleCompleted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  {isModuleCompleted && !quizCompleted 
                    ? "¡Ya completaste este módulo!" 
                    : "¡Excelente trabajo!"}
                </h2>
                <p className="text-stone-600 mb-8">
                  {module.id < 9 
                    ? "Puedes continuar con el siguiente módulo."
                    : "¡Has completado todos los módulos del curso!"}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {!isModuleCompleted && (
                    <button
                      onClick={() => setQuizCompleted(false)}
                      className="px-6 py-2 border-2 border-[#C07B4F] text-[#C07B4F] rounded-full font-semibold hover:bg-[#fdf3ea]"
                    >
                      Repetir ejercicios
                    </button>
                  )}
                  
                  <button
                    onClick={goToNextModule}
                    className="px-8 py-3 bg-[#C07B4F] text-white rounded-full font-semibold hover:bg-[#a96b42]"
                  >
                    {module.id < 9 ? "Siguiente módulo →" : "Ver mi progreso"}
                  </button>
                </div>
              </div>
            ) : (
              <QuizComponent
                questions={module.quiz}
                onComplete={handleQuizComplete}
                saving={saving}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ModulePage;