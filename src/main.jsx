import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import ProfilePage from './pages/ProfilePage.jsx';
import MyProgressPage from './pages/MyProgressPage.jsx';
import RequireAuth from './components/common/RequireAuth.jsx';
// ...importa aquí tus otras páginas (ProfilePage, MyProgressPage, etc.)

// 2. Define tu "mapa" de rutas
const router = createBrowserRouter([
  {
    path: '/', // La ruta "raíz"
    element: <App />, // Usará App.jsx como la plantilla para todas las rutas
    // 3. Define las "rutas hijas" que se mostrarán DENTRO de <App />
    children: [
      {
        path: '/', // Cuando la URL sea solo "/", muestra HomePage
        element: <HomePage />,
      },
      {
        path: '/login', // Cuando la URL sea "/login", muestra LoginPage
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      // Ruta protegida: Perfil
      {
        path: '/profile',
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },

      // Ruta protegida: Progreso
      {
        path: '/progress',
        element: (
          <RequireAuth>
            <MyProgressPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
      

// 4. "Provee" o entrega estas rutas a tu aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);