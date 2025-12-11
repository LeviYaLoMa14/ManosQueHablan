// src/components/course/QuizComponent.jsx
import React, { useState } from "react";
import { customImages } from "../../data/modulesData.js";

function QuizComponent({ questions, onComplete, saving }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;
  const totalQuestions = questions.length;
  const passingScore = Math.ceil(totalQuestions * 0.6); // 60% para aprobar

  const handleSelectAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      // Mostrar resultado final
      setShowResult(true);
      const finalScore = correctAnswers + (isCorrect ? 1 : 0);
      const passed = finalScore >= passingScore;
      onComplete(passed);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setAnswered(false);
  };

  // Mostrar resultado final
  if (showResult) {
    const finalScore = correctAnswers;
    const passed = finalScore >= passingScore;
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div className={`text-6xl mb-4 ${passed ? "" : "grayscale"}`}>
          {passed ? "🏆" : "📚"}
        </div>
        
        <h2 className={`text-2xl font-bold mb-4 ${passed ? "text-green-600" : "text-amber-600"}`}>
          {passed ? "¡Felicidades!" : "Sigue practicando"}
        </h2>
        
        <div className="bg-stone-50 rounded-2xl p-6 mb-6">
          <p className="text-4xl font-bold text-stone-800 mb-2">
            {finalScore} / {totalQuestions}
          </p>
          <p className="text-stone-600">
            respuestas correctas ({percentage}%)
          </p>
          
          <div className="mt-4 h-4 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                passed ? "bg-green-500" : "bg-amber-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <p className="mt-2 text-sm text-stone-500">
            Necesitas {passingScore} correctas para aprobar
          </p>
        </div>

        {passed ? (
          <p className="text-stone-600 mb-6">
            {saving ? "Guardando tu progreso..." : "¡Has completado este módulo exitosamente!"}
          </p>
        ) : (
          <div>
            <p className="text-stone-600 mb-6">
              No te preocupes, puedes revisar el contenido y volver a intentarlo.
            </p>
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-[#C07B4F] text-white rounded-full font-semibold hover:bg-[#a96b42] transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progreso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-stone-500">
            Pregunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <span className="text-sm text-stone-500">
            {correctAnswers} correctas
          </span>
        </div>
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C07B4F] rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-stone-800 mb-6">
          {question.question}
        </h3>

        {/* Imagen de referencia si existe */}
        {question.image && customImages[question.image] && (
          <div className="mb-6 flex justify-center">
            <img
              src={customImages[question.image]}
              alt={`Seña de ${question.image}`}
              className="w-32 h-32 object-contain rounded-lg bg-stone-50 p-2"
            />
          </div>
        )}

        {/* Opciones */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
            
            if (answered) {
              if (index === question.correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-stone-200 bg-stone-50 text-stone-500";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-[#C07B4F] bg-[#fdf3ea] text-stone-800";
              } else {
                buttonClass += "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={answered}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    answered
                      ? index === question.correct
                        ? "bg-green-500 text-white"
                        : index === selectedAnswer
                        ? "bg-red-500 text-white"
                        : "bg-stone-300 text-stone-600"
                      : selectedAnswer === index
                      ? "bg-[#C07B4F] text-white"
                      : "bg-stone-200 text-stone-600"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`mt-6 p-4 rounded-xl ${
            isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}>
            <p className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "✓ ¡Correcto!" : "✗ Incorrecto"}
            </p>
            {!isCorrect && (
              <p className="text-sm text-stone-600 mt-1">
                La respuesta correcta es: <strong>{question.options[question.correct]}</strong>
              </p>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-4">
          {!answered ? (
            <button
              onClick={handleConfirm}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedAnswer === null
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                  : "bg-[#C07B4F] text-white hover:bg-[#a96b42]"
              }`}
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-full font-semibold bg-[#C07B4F] text-white hover:bg-[#a96b42] transition-colors"
            >
              {currentQuestion < totalQuestions - 1 ? "Siguiente →" : "Ver resultados"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;