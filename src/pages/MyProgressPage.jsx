import { useNavigate } from "react-router-dom";

function MyProgressPage() {
  const navigate = useNavigate();

  const goToModule = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center px-4 py-10">
      {/* título, barra 65% etc. */}

      <div className="w-full max-w-3xl space-y-4 mt-8">
        {/* Módulo 1 */}
        <div className="bg-[#F6F1E8] rounded-2xl flex items-center justify-between px-6 py-4">
          {/* icono y texto */}
          <button
            onClick={() => goToModule(1)}
            className="px-6 py-2 rounded-full bg-[#C07B4F] text-white font-semibold"
          >
            Revisar
          </button>
        </div>

        {/* Módulo 2 */}
        <div className="bg-[#F6F1E8] rounded-2xl border-2 border-[#C07B4F] flex items-center justify-between px-6 py-4">
          {/* icono y texto */}
          <button
            onClick={() => goToModule(2)}
            className="px-6 py-2 rounded-full bg-[#C07B4F] text-white font-semibold"
          >
            Continuar
          </button>
        </div>

        {/* Módulo 3 */}
        <div className="bg-[#F6F1E8] rounded-2xl flex items-center justify-between px-6 py-4">
          {/* icono y texto */}
          <button
            disabled
            className="px-6 py-2 rounded-full bg-stone-400 text-white font-semibold opacity-80 cursor-not-allowed"
          >
            Bloqueado
          </button>
        </div>
      </div>
    </main>
  );
}

export default MyProgressPage;
