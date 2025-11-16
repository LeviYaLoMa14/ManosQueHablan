import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    // 👇 OJO: todos estos ahora van a "/#..."
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

    // login: ruta normal del router
    { href: "/login", label: "Iniciar sesión" },
  ];

  return (
    <header
      className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm"
      id="header"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 py-4">
        {/* Logo → siempre manda a la raíz */}
        <Link
          className="text-xl font-bold text-[#C07B4F] whitespace-nowrap"
          to="/"
        >
          Manos que Hablan
        </Link>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              // Enlaces a secciones de la landing → usamos <a> normal para que el hash haga scroll
              <a
                key={item.href}
                className="nav-link text-stone-700 hover:text-[#C07B4F]"
                href={item.href}
              >
                {item.label}
              </a>
            ) : (
              // Rutas reales del router (login/register/etc)
              <Link
                key={item.href}
                className="nav-link text-stone-700 hover:text-[#C07B4F]"
                to={item.href}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
