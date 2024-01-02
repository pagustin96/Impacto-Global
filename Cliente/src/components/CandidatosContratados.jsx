import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/candidatosContratados.css'

export const CandidatosContratados = ({contratados, data}) => {
  //  const [data, setData] = useState()
    useEffect(() => {
    //  handleLast10()
    },[contratados])
   /* const handleLast10 = async() => {
              
      try {
          const response = await axios.get(`http://localhost:8081/home/conteoCards`,
          {withCredentials: true})
          setData(response.data)
          console.log(response.data)
      } catch ( error) {
          console.log('Respuesta del servidor: ', error)
      }
    } */
  
  return (
    <div className='cand-dash-container' >
      <div className='cand-dash-box-container'>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z" fill="#000000"></path> </g></svg>
        <h2>CANDIDATO CONTRATADOS</h2>
        <p>{data? data.contratados : 'cargando...'}</p>
      </div>
    </div>
  )
}