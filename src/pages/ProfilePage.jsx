// El Perfil: Sería src/pages/ProfilePage.jsx.
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const goToProgress = () => navigate("/progress");

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 py-10 md:px-16 md:py-12">
        {/* título, avatar, campos... */}

        {/* fila de botones al final */}
        <div className="mt-8 flex flex-wrap justify-end gap-4">
          <button className="px-8 py-2 rounded-full border border-[#C07B4F] text-[#C07B4F] bg-white hover:bg-[#fdf3ea]">
            Cancelar
          </button>
          <button className="px-8 py-2 rounded-full bg-[#C07B4F] text-white hover:bg-[#a96b42]">
            Guardar
          </button>
          <button
            type="button"
            onClick={goToProgress}
            className="px-8 py-2 rounded-full border border-stone-400 text-stone-600 bg-white hover:bg-stone-100"
          >
            Ver mi progreso
          </button>
        </div>
      </div>
    </main>
  );
}
