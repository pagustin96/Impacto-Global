import React, { useState, useEffect } from 'react';
import '../styles/somethingWentWrong.css'

export const SomethingWentWrong = () => {
  const [fallingR, setFallingR] = useState(false);

  // Usar useEffect para hacer que la "R" caiga después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setFallingR(true);
    }, 2000); // 2000 milisegundos (2 segundos)

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="error-component">
      <h1>¡Algo salió mal!</h1>
      <div className={`falling-r ${fallingR ? 'fall' : ''}`}>R</div>
    </div>
  );
}

