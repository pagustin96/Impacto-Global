import React from 'react'
import '../styles/perfil.css'

export const Perfil = () => {
  return (
    <div className='perfil-container'>
        <div className='perfil-titulo'>Configuracion De La Cuenta</div>
        <div className='circulo-container-perfil'><p></p><div className='circulo-perfil'>
          <img src={`/img/img_perfil/perfil.webp`} alt="perfil_img" className='circulo-perfil'/></div></div>
          <div className='perfil-nombre'>Nombre Apellido</div>
          <div className="perfil-email">email@email.com</div>
    </div>
  )
}
