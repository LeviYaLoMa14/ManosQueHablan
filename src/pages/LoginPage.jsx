// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  // del context (pero usaremos simulación abajo)
  const { login, loading, error } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Si venía de ruta protegida → volver ahí
  const from = location.state?.from || "/";

  const [simulating, setSimulating] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // ============================
    // 🔥 SIMULACIÓN DE LOGIN
    // ============================
    setSimulating(true);
    setTimeout(async () => {
      setSimulating(false);

      // usuario y pass falsos para pruebas
      if (email === "test@correo.com" && password === "1234") {
        // si quisieras simular que AuthContext recibe un usuario:
        await login(
          email,
          password,
          /* 
            Puedes luego modificar tu AuthContext para permitir:
              login(email, password, fakeUser)
            donde fakeUser sea:
              { id: 1, name: "Usuario Demo", email }
          */
        );

        navigate(from, { replace: true });
      } else {
        setLocalError("Credenciales incorrectas. Prueba con test@correo.com / 1234");
      }
    }, 800);

    return;

    // ============================
    // 📌 LLAMADA REAL A LA API (comentada)
    // ============================
    /*
    try {
      await login(email, password); // esto haría POST a tu API real
      navigate(from, { replace: true });
    } catch (err) {
      // error aparece desde AuthContext
    }
    */
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 py-10 md:px-16 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* COLUMNA IZQUIERDA */}
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

          {/* COLUMNA DERECHA */}
          <div className="md:w-1/2 w-full">
            <div className="flex justify-center md:justify-start mb-8">
              <span className="inline-block bg-[#C07B4F] text-white px-10 py-2 rounded-full text-lg font-semibold">
                Bienvenido
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

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

              {/* Errores: simulación o API */}
              {(localError || error) && (
                <p className="text-sm text-red-600">
                  {localError || error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button
                  type="submit"
                  disabled={loading || simulating}
                  className="px-8 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42] transition-colors disabled:opacity-60"
                >
                  {simulating ? "Iniciando..." : "Iniciar sesión"}
                </button>

                <button
                  type="button"
                  onClick={goToRegister}
                  className="px-8 py-2 rounded-full border border-[#C07B4F] text-[#C07B4F] font-semibold bg-white hover:bg-[#fdf3ea] transition-colors"
                >
                  Registrarse
                </button>
              </div>

              <p className="mt-4 text-sm text-stone-500 text-center md:text-left">
                ¿Olvidaste tu contraseña?
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
