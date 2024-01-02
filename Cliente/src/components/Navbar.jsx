import React from 'react'
import {NavLink, useLocation} from 'react-router-dom';
import '../styles/navbar.css'

export const Navbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register', '/forget-password', /^\/vacante-list\/.*/, /^\/vacante-info\/.*/]
  const hideNavbar = hideNavbarRoutes.some(route => {
    if (typeof route === 'string') {
      return location.pathname === route;
    }
    if (route instanceof RegExp) {
      return route.test(location.pathname);
    }
    return false;
  });
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
  } to='/reclutamiento'>Reclutamiento</NavLink></div>
  
            <div><NavLink className={({ isActive, isPending }) =>
    isPending ? "link" : isActive ? "activelink" : "link"
  } to='/candidatos'>Candidatos</NavLink></div>
        </div>
        <div className='circulo-container'><p># {sessionStorage.getItem('id_user')}</p><NavLink to={'/perfil'}><div className='circulo-perfil'>
          <img src={`/img/img_perfil/perfil.webp`} alt="perfil_img" className='circulo-perfil'/></div></NavLink></div>

    </nav>
  )
}
