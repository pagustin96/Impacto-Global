import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/home.css'
import { CandidatoDashboard } from './CandidatoDashboard';

export const Home = () => {
const [data, setData] = useState();
useEffect(() =>{
handleAll()
},[])
console.log(data)
  const handleAll = () => {
    // Llamada a la API en localhost:8081
 /*   fetch('http://localhost:8081/usuario/all')
    .then((response) => response.json())
    .then(res =>  setData(res))
    .catch(error => {
    console.error('Error al obtener los datos:', error);
    });     */ 
    
}
  return (
  <>
   <div className='home-container'>
    <div className='reclutamiento-container'>
          <div className='vacantes-container'>
            <div className='saludo'><h2>DASHBOARD</h2></div>
          </div>
          
      </div>
      <div className='cand-dash-container'>
        <CandidatoDashboard titulo={'CANDIDATOS POSTULADOS'} />
        <CandidatoDashboard titulo={'CANDIDATOS CONTRATADOS'}/>
        <CandidatoDashboard titulo={'CANDIDATOS EN ESPERA'}/>
        <CandidatoDashboard titulo={'CANDIDATOS RECHAZADOS'}/>
      </div>
      <div className='saludo'><h2>REGISTRO DE ENTREVISTAS</h2></div>
      <form action="submit" className='registro-entrevistas'>
        <label htmlFor=""></label>
        <input type="text" 
        placeholder='Buscar...'/>
        <button type='submit'>Buscar</button>
        
      </form>
    </div>
  </>
   
  )
}
