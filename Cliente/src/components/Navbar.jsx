import React from 'react'
import {NavLink, useLocation} from 'react-router-dom';
import '../styles/navbar.css'

export const Navbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register']
  const hideNavbar = hideNavbarRoutes.includes(location.pathname)
  if (hideNavbar){
    return null;
  }
  
  return (
    <nav className='navbar-container'>
        <div className='titulo-container'>
          <img className='img-navbar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/>
        </div>
        <div className='sections-container'>

            <div><NavLink className={({ isActive, isPending }) =>
    isPending ? "link" : isActive ? "activelink" : "link"
  } to='/home'>Home</NavLink></div>

            <div><NavLink className={({ isActive, isPending }) =>
    isPending ? "link" : isActive ? "activelink" : "link"
  } to='/reclutamiento'>Reclutamiento</NavLink> </div>
  
            <div><NavLink className={({ isActive, isPending }) =>
    isPending ? "link" : isActive ? "activelink" : "link"
  } to='/candidatos'>Candidatos</NavLink></div>
        </div>
        <div className='circulo-container'><p>#1</p><NavLink to={'/perfil'}><div className='circulo-perfil'>
          <img src={`/img/img_perfil/perfil.webp`} alt="perfil_img" className='circulo-perfil'/></div></NavLink></div>

    </nav>
  )
}
