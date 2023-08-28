import React from 'react'
import '../styles/inicio.css'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='container-inicio'>
        
        <img className='img-ar' src='/img/img_logos_arcons/1.png' alt='logoarcons'/>
        
        <div className='btn-container'>
            <div className='btn-reg-container'><button className='btn-registrarse'><Link to={'/register'} className='link-btn2'>REGISTRARSE</Link></button></div>
            <div className='btn-ing-container'><button className='btn-ingresar'><Link to={'/login'} className='link-btn'>¿YA TENES CUENTA?</Link></button></div>
        </div>
        <div className='texto-id'><p>Nuestra gran pasión</p><p> es el resultado de</p> <p>nuestro trabajo.</p></div>
    </div>
  )
}
