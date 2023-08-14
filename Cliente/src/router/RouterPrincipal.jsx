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

export const RouterPrincipal = () => {
  return (
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
    </Routes>
   </BrowserRouter>
  )
}
