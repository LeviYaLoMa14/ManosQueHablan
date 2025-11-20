// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = "https://manos-hablan.fly.dev/api/v1";

function ProfilePage() {
  
  const { user, logout, updateUser } = useAuth();


  // Estados locales (inicialmente vacíos, luego se llenan)
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio]           = useState("");

  const [saving, setSaving]     = useState(false);
  const [message, setMessage]   = useState(null);
  const [error, setError]       = useState(null);

  // Cargar datos desde el contexto al entrar
  useEffect(() => {
    if (user) {
      setFullName(user.nombre_completo || "");
      setEmail(user.correo || "");
      setBio(user.descripcion || "");
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSaving(true);

    try {
      const body = {
        nombre_completo: fullName,
        correo: email,
        descripcion: bio,
      };

      // Solo enviar contraseña si el usuario quiere cambiarla
      if (password.trim() !== "") {
        body.contrasena = password;
      }

      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al actualizar el perfil");
      }

      // ✅ Actualizar usuario en contexto (y localStorage) SIN recargar página
      const updatedUser = data.usuario;
      updateUser(updatedUser);

      // limpiar contraseña del formulario
      setPassword("");

      setMessage("Perfil actualizado correctamente ✔");

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };


  const handleCancel = () => {
    if (!user) return;
    setFullName(user.nombre_completo || "");
    setEmail(user.correo || "");
    setPassword("");
    setBio(user.descripcion || "");
    setMessage(null);
  };

  const handleChangePhoto = () => {
    alert("En el futuro podrás cambiar tu foto de perfil 🙂");
  };

  if (!user) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <p className="text-stone-600">Cargando perfil...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl px-6 py-10 md:px-16 md:py-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-stone-700 mb-8">
          Mi perfil
        </h1>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Encabezado con avatar */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
            <div className="w-20 h-20 rounded-full bg-stone-300 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-xl font-semibold text-stone-700">
                {fullName}
              </p>
              <p className="text-stone-500">{email}</p>
            </div>

            <button
              type="button"
              onClick={handleChangePhoto}
              className="px-6 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42]"
            >
              Cambiar foto
            </button>
          </div>

          {/* Campos */}
          <div className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block mb-2 font-medium">Nombre completo:</label>
              <input
                type="text"
                className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 focus:ring-2 focus:ring-[#C07B4F]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Correo y contraseña */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2">
                <label className="block mb-2 font-medium">Correo:</label>
                <input
                  type="email"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 focus:ring-2 focus:ring-[#C07B4F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="md:w-1/2">
                <label className="block mb-2 font-medium">Contraseña:</label>
                <input
                  type="password"
                  className="w-full bg-[#F6F1E8] rounded-full px-6 py-3 focus:ring-2 focus:ring-[#C07B4F]"
                  placeholder="Dejar vacío para no cambiarla"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Biografía */}
            <div>
              <label className="block mb-2 font-medium">Biografía:</label>
              <textarea
                className="w-full bg-[#F6F1E8] rounded-3xl px-6 py-4 focus:ring-2 focus:ring-[#C07B4F] resize-none"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {/* Mensajes */}
          {error && (
            <p className="text-center text-red-600">{error}</p>
          )}
          {message && (
            <p className="text-center text-green-700">{message}</p>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 rounded-full border border-[#C07B4F] text-[#C07B4F] bg-white hover:bg-[#fdf3ea]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 rounded-full bg-[#C07B4F] text-white font-semibold hover:bg-[#a96b42] disabled:opacity-60"
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
