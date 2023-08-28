import React from 'react'
import '../styles/perfil.css'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'

export const Perfil = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/api/user/logOut`, {withCredentials: true});
      console.log(response)
      navigate('/login')
    } catch (error){
      console.error('Error al obtener los datos:', error);
    }
  }
  return (
    <div className='perfil-container'>
        <div className='perfil-titulo'>Configuracion De La Cuenta</div>
        <div className='circulo-container-perfil'><p></p><div className='circulo-perfil'>
          <img src={`/img/img_perfil/perfil.webp`} alt="perfil_img" className='circulo-perfil'/></div></div>
          <div className='perfil-nombre'>Nombre Apellido</div>
          <div className="perfil-email">email@email.com</div>
          <button className='cerrar-sesion-btn' onClick={() => handleLogOut()}>Cerrar Sesion</button>
    </div>
  )
}
