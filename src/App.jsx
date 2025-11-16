import React from 'react';
// 1. Importa el Outlet
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer';

function App() {
  return (
    <div>
      {/* 2. Tu Navbar iría aquí, para que se vea en TODAS las páginas */}
      <Navbar />
      
      <main>
        {/* 3. Aquí es donde React Router "inyectará" la página
                 correspondiente (HomePage, LoginPage, etc.) */}
        <Outlet />
      </main>
      
      {/* 4. Tu Footer o pie de página también podría ir aquí */}
      <Footer />
    </div>
  );
}

export default App;