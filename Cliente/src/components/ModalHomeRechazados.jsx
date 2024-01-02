import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/modalHomePostulados.css'

export const ModalHomeRechazados = ({rechazados, setRechazados}) => {
   
    const [data, setData] = useState('')


    useEffect(() => {
        handleLast10()
    },[])
    

console.log('asdad: ', data)
    
    const handleLast10 = async() => {
        
        
        try {
            const response = await axios.get(`http://localhost:8081/home/last10Rechazados`,
            {withCredentials: true})
            setData(response.data)
            console.log(response.data)
        } catch ( error) {
            console.log('Respuesta del servidor: ', error)
        }
      }
  return (
    <>
    {rechazados &&
    <div className='overlay'>
        <div className='modal-postulaciones-container'>
            <div className='encabezado-modal-postulados'>
                <h2>
                Candidatos Rechazados
                </h2>
            </div>
             <div className='close-btn'>
                <button onClick={()=> setRechazados(false)}>x</button>
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
