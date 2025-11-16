/* 
Pestaña de progreso y módulos: Esto suena a que pertenece a una página específica de un curso. Yo lo llamaría src/pages/CourseDetailPage.jsx. Dentro de esta página, tendrías componentes más pequeños:

    Un componente ModuleList.jsx (para ver los módulos).

    Un componente ProgressTracker.jsx (para la barra de progreso).

    Un componente VideoPlayer.jsx (para ver la lección).
*/

import ProfilePage from "./pages/ProfilePage.jsx";
import RequireAuth from "./components/common/RequireAuth.jsx";

// ...
children: [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  // igual para /courses, /progress, etc.
]
