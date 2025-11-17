// src/pages/ProfilePage.jsx
import React, { useState } from "react";
// Si luego quieres usar los datos reales del usuario desde el contexto:
// import { useAuth } from "../context/AuthContext.jsx";

function ProfilePage() {
  // const { user } = useAuth(); // <- cuando tengas AuthContext listo

  // Valores iniciales simulados
  const [fullName, setFullName] = useState("Usuario Registrado");
  const [email, setEmail] = useState("usuario@correo.com");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setMessage(null);

    // ==============================
    // 🔥 SIMULACIÓN DE GUARDADO
    // ==============================
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMessage("Perfil guardado (simulado). Más adelante se conectará a la API.");
    }, 800);

    return;

    // ==============================
    // 📌 AQUÍ IRÍA LA LLAMADA REAL A LA API
    // ==============================
    /*
    try {
      setSaving(true);
      await api.updateProfile({ fullName, email, password, bio });
      setSaving(false);
      setMessage("Perfil actualizado correctamente");
    } catch (err) {
      setSaving(false);
      setMessage("Ocurrió un error al guardar el perfil");
    }
    */
  };

  const handleCancel = () => {
    // Volver a valores "originales" (simulados)
    setFullName("Usuario Registrado");
    setEmail("usuario@correo.com");
    setPassword("");
    setBio("");
    setMessage(null);
  };

  const handleChangePhoto = () => {
    // Solo simulación
    alert("Más adelante aquí podrás cambiar tu foto de perfil 🙂");
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 py-10 md:px-16 md:py-12">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-stone-700 mb-8">
          Mi perfil:
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Encabezado con avatar, nombre y botón */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-8 mb-4">
            {/* Avatar */}
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="w-20 h-20 rounded-full bg-stone-300 flex items-center justify-center">
                <span className="text-4xl text-stone-100">👤</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-semibold text-stone-700">
                  {fullName || "Usuario Registrado"}
                </p>
              </div>
            </div>

            {/* Botón cambiar foto */}
            <div className="w-full md:flex-1 flex justify-start md:justify-end">
              <button
                type="button"
                onClick={handleChangePhoto}
                className="px-6 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42] transition-colors"
              >
                Cambiar foto
              </button>
            </div>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-4">
            {/* Nombre completo */}
            <div>
              <label className="block text-base font-medium text-stone-700 mb-2">
                Nombre completo:
              </label>
              <input
                type="text"
                className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Correo + Contraseña en fila */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2">
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="md:w-1/2">
                <label className="block text-base font-medium text-stone-700 mb-2">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Dejar en blanco para no cambiarla"
                />
              </div>
            </div>

            {/* Biografía */}
            <div>
              <label className="block text-base font-medium text-stone-700 mb-2">
                Biografía:
              </label>
              <textarea
                className="w-full bg-[#F6F1E8] rounded-3xl px-6 py-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C07B4F] resize-none"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Cuéntanos un poco sobre ti..."
              />
            </div>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <p className="text-sm text-center text-stone-600 mt-2">
              {message}
            </p>
          )}

          {/* Botones */}
          <div className="mt-6 flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 rounded-full border border-[#C07B4F] text-[#C07B4F] font-semibold bg-white hover:bg-[#fdf3ea] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42] transition-colors disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ProfilePage;
