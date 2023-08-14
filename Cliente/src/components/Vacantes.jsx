import React, { useEffect } from 'react'
import '../styles/vacantes.css'

export const Vacantes = ({setSelectedCandidate, setEstado, setModificar, data}) => {

    useEffect(() => { 

    }, [data])
  
    const modificarCandidato= (item)=> {
        setSelectedCandidate(item)
        setEstado(true)
        setModificar(true)
    }

    const handleDelete = (id) =>{
        
        fetch(`http://localhost:8081/vacantes/delete/${id}`, { //cambiar id por nombre
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((data) => {
            // Aquí puedes hacer algo con la respuesta del servidor si lo deseas
            console.log('Respuesta del servidor:', data);
          })
          .catch((error) => {
            console.error('Error al enviar los datos:', error);
          });
          //setDeleteUser(true)
      }
      console.log(data)
  return (
    <>

        {Array.isArray(data) ? 
        data.map((data) => 
        ( data.activo && 
          
        <div className='card-container' key={data.id}>
            <div className='card-img-container'>
                <img className='card-img' src= {`/img/img_vacantes/${data.empresa.toLowerCase()}.png`} alt='claroimg' />    
            </div>
            <div className='info-card-container' >
                <div className='empresa-card'>
                    {data.empresa.toUpperCase()}
                    <div className='close-btn-card'>
                        <button onClick={() => modificarCandidato(data)}>m</button>
                        <button onClick={() => handleDelete(data.id)}>x</button>
                    </div>
                </div>
                <div className='identificador-card'>Identificador #{data.id} </div>
                
                <div>Vacante: {data.nombre} </div>
                <div>Seniority: {data.seniority} </div>
                <div>Skills: {data.skills} </div>
                <div>Ingles: {data.ningles} </div>
                <div>Cantidad de vacantes: {data.cantidad} </div>
                <div>Rate: {data.rate} </div>
                <div>Activo: {data.activo ? 'Si' : 'No'} </div>
                <div>Comienzo: {data.comienzo} </div>
                <div>Cierre: {data.cierre} </div>
            </div>
        </div>
        )) : <p>No data available</p>
        }


  
    </>
  )
}
