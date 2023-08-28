import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Inicio } from '../components/Inicio'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Home } from '../components/Home'
import { Candidatos } from '../components/Candidatos'
import { Reclutamiento } from '../components/Reclutamiento'
import { Navbar } from '../components/Navbar'
import { Perfil } from '../components/Perfil'
import NotFound from '../components/NotFound'
import { Provider } from 'react-redux'
import store from '../store/store'

export const RouterPrincipal = () => {
  return (
  <Provider store={store}>
   <BrowserRouter>
    <Navbar/>
    <Routes>
      
        <Route path='/' element={ <Inicio/> }/>
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/home' element={<Home/>} />
        <Route path='/candidatos' element={<Candidatos/>} />
        <Route path='/reclutamiento' element={<Reclutamiento/>} />
        <Route path='/perfil' element={<Perfil/>} />
        <Route path='/*' element={<NotFound/>} />
     
    </Routes>
   </BrowserRouter>
   </Provider>
  )
}
