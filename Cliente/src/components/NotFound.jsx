import React from 'react';
import '../styles/NotFound.css'; // Importa el archivo de estilos CSS

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Error 404: Página no encontrada</h1>
      <p className="not-found-message">Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFound;
