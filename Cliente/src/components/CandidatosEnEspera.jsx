import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/candidatosEnEspera.css'


export const CandidatosEnEspera = ({enEspera, data}) => {
  //const [data, setData] = useState()
  useEffect(() => {
   // handleLast10()
  },[enEspera])
  /*const handleLast10 = async() => {
            
    try {
        const response = await axios.get(`http://localhost:8081/home/conteoCards`,
        {withCredentials: true})
        setData(response.data)
        console.log(response.data)
    } catch ( error) {
        console.log('Respuesta del servidor: ', error)
    }
  }*/
  
  return (
    <div className='cand-dash-container' >
      <div className='cand-dash-box-container'>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2071 3.6797C11.0909 3.85386 11 4.14834 11 4.5V6V11C11 11.5523 10.5523 12 10 12C9.44772 12 9 11.5523 9 11V6C9 5.64834 8.90906 5.35386 8.79295 5.1797C8.6966 5.03518 8.61209 5 8.5 5C8.38791 5 8.3034 5.03518 8.20705 5.1797C8.09094 5.35386 8 5.64834 8 6V12V15C8 15.5523 7.55228 16 7 16C6.44772 16 6 15.5523 6 15V12C6 11.6483 5.90906 11.3539 5.79295 11.1797C5.6966 11.0352 5.61209 11 5.5 11C5.38791 11 5.3034 11.0352 5.20705 11.1797C5.09094 11.3539 5 11.6483 5 12V16C5 17.033 5.70057 18.1402 7.0547 19.0429C8.3875 19.9315 10.1939 20.5 12 20.5C15.6675 20.5 18 18.251 18 16V9C18 8.64834 17.9091 8.35386 17.7929 8.1797C17.6966 8.03518 17.6121 8 17.5 8C17.3879 8 17.3034 8.03518 17.2071 8.1797C17.0909 8.35386 17 8.64834 17 9V12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12V9V6C15 5.64834 14.9091 5.35386 14.7929 5.1797C14.6966 5.03518 14.6121 5 14.5 5C14.3879 5 14.3034 5.03518 14.2071 5.1797C14.0909 5.35386 14 5.64834 14 6V11C14 11.5523 13.5523 12 13 12C12.4477 12 12 11.5523 12 11V6V4.5C12 4.14834 11.9091 3.85386 11.7929 3.6797C11.6966 3.53518 11.6121 3.5 11.5 3.5C11.3879 3.5 11.3034 3.53518 11.2071 3.6797ZM13.7452 3.12242C13.975 3.04395 14.227 3 14.5 3C15.3879 3 16.0534 3.46482 16.4571 4.0703C16.8409 4.64614 17 5.35166 17 6V6.05195C17.1578 6.01815 17.3245 6 17.5 6C18.3879 6 19.0534 6.46482 19.4571 7.0703C19.8409 7.64614 20 8.35166 20 9V16C20 19.749 16.3325 22.5 12 22.5C9.80613 22.5 7.6125 21.8185 5.9453 20.7071C4.29943 19.6098 3 17.967 3 16V12C3 11.3517 3.15906 10.6461 3.54295 10.0703C3.9466 9.46482 4.61209 9 5.5 9C5.67545 9 5.84222 9.01815 6 9.05195V6C6 5.35166 6.15906 4.64614 6.54295 4.0703C6.9466 3.46482 7.61209 3 8.5 3C8.77302 3 9.02501 3.04395 9.25482 3.12242C9.33156 2.92998 9.427 2.74423 9.54295 2.5703C9.9466 1.96482 10.6121 1.5 11.5 1.5C12.3879 1.5 13.0534 1.96482 13.4571 2.5703C13.573 2.74423 13.6684 2.92998 13.7452 3.12242Z" fill="#000000"></path> </g></svg>
        <h2>CANDIDATO EN ESPERA</h2>
        <p>{data? data.en_espera : 'cargando...'}</p>
      </div>
    </div>
  )
}
