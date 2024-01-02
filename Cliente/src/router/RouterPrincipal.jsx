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
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ForgetPassword } from '../components/ForgetPassword'
import {SomethingWentWrong} from '../components/SomethingWentWrong'
import { VacanteLista } from '../components/VacanteLista'
import { InfoVacante } from '../components/InfoVacante'

export const RouterPrincipal = () => {

  
  return (
  <Provider store={store}>
   <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route index element={ <Inicio/> }/>
        <Route path='/' element={ <Inicio/> }/>
        <Route path='/inicio' element={ <Inicio/> }/>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/forget-password' element={ <ForgetPassword/> } />
        <Route element={<ProtectedRoute />} >
          <Route path='/home' element={<Home/>} />
          <Route path='/candidatos' element={<Candidatos/>} />
          <Route path='/reclutamiento' element={<Reclutamiento/>} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/*' element={<NotFound/>} />
          <Route path='/sww' element={<SomethingWentWrong />} />
          <Route path='/vacante-list/:id_cliente/:nombre_cliente' element={<VacanteLista />} />
          <Route path='/vacante-info/:id_vacante/:nombre_vacante' element={<InfoVacante />} />
        </Route>
    </Routes>
   </BrowserRouter>
   </Provider>
  )
}
