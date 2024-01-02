import React from 'react'
import '../styles/inicio.css'
import { NavLink } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='container-inicio'>
        
        <img className='img-ar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/>
        
        <div className='btn-container'>
            <NavLink to={'/register'} className='link-btn2'><div className='btn-reg-container'><button className='btn-registrarse'>REGISTRARSE</button></div></NavLink>
            <NavLink to={'/login'} className='link-btn'><div className='btn-ing-container'><button className='btn-ingresar'>¿YA TENES CUENTA?</button></div></NavLink>
        </div>
        <div className='texto-id'><p>"Nuestra gran pasión es el </p> <p> resultado de nuestro trabajo."</p></div>
    </div>
  )
}
