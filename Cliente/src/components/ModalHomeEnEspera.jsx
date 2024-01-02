import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/modalHomePostulados.css'

export const ModalHomeEnEspera = ({enEspera, setEnEspera}) => {
   
    const [data, setData] = useState('')


    useEffect(() => {
        handleLast10()
    },[])
    

console.log('asdad: ', data)
    
    const handleLast10 = async() => {
        
        
        try {
            const response = await axios.get(`http://localhost:8081/home/last10EnEspera`,
            {withCredentials: true})
            setData(response.data)
            console.log(response.data)
        } catch ( error) {
            console.log('Respuesta del servidor: ', error)
        }
      }
  return (
    <>
    {enEspera &&
    <div className='overlay'>
        <div className='modal-postulaciones-container'>
            
            <div className='encabezado-modal-postulados'>
                <h2>
                Candidatos En Espera
                </h2>
            </div>
             <div className='close-btn'>
                <button onClick={()=> setEnEspera(false)}>x</button>
            </div>
            {
            data? data.map((dato) => (
                <div className='modal-datos-postulados' key={dato.id}>{`Nombre: ${dato.nombre} ${dato.apellido} - Tecnologia: ${dato.seniority}`}</div>
            )) : <div>NO hay datos</div>
            }
        </div>
    </div>
    }
</>
  )
}
