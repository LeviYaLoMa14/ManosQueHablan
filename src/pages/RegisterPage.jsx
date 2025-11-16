// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [about,    setAbout]    = useState("");

  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 👉 Aquí luego puedes llamar a tu API real:
      // const res = await fetch("http://localhost:3000/api/register", { ... });
      // const data = await res.json();

      // Por ahora solo simulamos éxito y redirigimos al login:
      setTimeout(() => {
        setLoading(false);
        navigate("/login"); // después de registrar, ir a iniciar sesión
      }, 600);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al registrarte. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 py-10 md:px-16 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Columna izquierda: texto descriptivo */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#C07B4F] leading-tight mb-6">
              Manos que <br className="hidden md:block" />
              hablan
            </h1>
            <p className="text-stone-600 text-lg leading-relaxed max-w-sm mx-auto md:mx-0">
              Somos una plataforma de enseñanza y promoción de la lengua
              de señas mexicana.
            </p>
          </div>

          {/* Columna derecha: formulario de registro */}
          <div className="md:w-1/2 w-full">
            {/* Chip "Bienvenido" */}
            <div className="flex justify-center md:justify-start mb-8">
              <span className="inline-block bg-[#C07B4F] text-white px-10 py-2 rounded-full text-lg font-semibold">
                Bienvenido
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Nombre completo:
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Cuéntanos sobre ti:
                </label>
                <textarea
                  className="w-full bg-[#F6F1E8] rounded-3xl px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F] min-h-[80px] resize-none"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="¿Por qué te interesa aprender LSM?"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-4 flex justify-center md:justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42] transition-colors disabled:opacity-60"
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
