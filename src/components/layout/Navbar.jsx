import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Secciones de la landing (siempre visibles)
  const landingItems = [
    { href: "/#dia-nacional", label: "Día Nacional" },
    { href: "/#lengua-o-lenguaje", label: "¿Lengua o Lenguaje?" },
    { href: "/#caracteristicas", label: "Características" },
    { href: "/#importancia", label: "Importancia" },
    { href: "/#historia", label: "Historia" },
    { href: "/#legislacion", label: "Legislación" },
    { href: "/#personas-cambio", label: "Personas que Inspiran" },
    { href: "/#explora", label: "Explora la Lengua" },
    { href: "/#brecha", label: "La Brecha Educativa" },
    { href: "/#comunidad", label: "Únete" },
  ];

  // Ítems relacionados con la sesión
  const authItemsWhenLoggedOut = [
    { href: "/login", label: "Iniciar sesión" },
    // si quieres también puedes agregar:
    // { href: "/register", label: "Registrarse" },
  ];

  const authItemsWhenLoggedIn = [
    { href: "/profile", label: "Mi perfil" },
    { href: "/progress", label: "Mi progreso" },
  ];

  const handleLogout = () => {
    logout();          // limpia el usuario (simulado)
    navigate("/");     // vuelve al inicio
  };

  return (
    <header
      className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm"
      id="header"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 py-4">
        {/* Logo → siempre manda al home */}
        <Link
          to="/"
          className="text-xl font-bold text-[#C07B4F] whitespace-nowrap"
        >
          Manos que Hablan
        </Link>

        {/* Menú */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
          {/* Secciones de la landing (usan hash /#id) */}
          {landingItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-stone-700 hover:text-[#C07B4F]"
            >
              {item.label}
            </a>
          ))}

          {/* Ítems según sesión */}
          {!user &&
            authItemsWhenLoggedOut.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link text-stone-700 hover:text-[#C07B4F]"
              >
                {item.label}
              </Link>
            ))}

          {user &&
            authItemsWhenLoggedIn.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link text-stone-700 hover:text-[#C07B4F]"
              >
                {item.label}
              </Link>
            ))}

          {user && (
            <button
              onClick={handleLogout}
              className="nav-link text-stone-700 hover:text-[#C07B4F]"
              type="button"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
