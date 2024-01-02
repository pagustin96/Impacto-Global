import React, { useEffect, useState } from 'react'
import '../styles/vacantes.css'
import axios from 'axios'
import { VacanteLista } from './VacanteLista'
import { NavLink } from 'react-router-dom'


export const Vacantes = ({searchName, setSearchName, setSelectedCandidate, setEstado, setModificar, dataFilter}) => {
    const [data, setData] = useState()
    
    
         useEffect(() => { 

            handleAll(searchName)
            
    }, [searchName])
  
    const handleAll = async(search) => {
        console.log('handleAll')
          try{
            const clientes = await axios.get(`http://localhost:8081/function/clientes`,
            {withCredentials: true})
            if(search !== ''){
                const newArr = clientes.data.filter((obj) => obj[1].toLowerCase().includes(search))
                setData(newArr)
            } else {
                setData(clientes.data)
            }
            
      
          } catch (error){
            console.error('Error al obtener los datos: ', error);
          }
      }

    const modificarCandidato= (item)=> {
        setSelectedCandidate(item)
        setEstado(true)
        setModificar(true)
    }

    const handleDelete = async(id) =>{
        console.log('idddddddddd:', id)
        const check = window.confirm("Deseas eleminar al candidato?")
        
        if(check){
            try {
                const response = await axios.put(`http://localhost:8081/vacantes/cancelar/${id}`, 
                {withCredentials: true})
                console.log('Respuesta del servidor:', response);
              }
              catch(error){
                console.error('Error al enviar los datos:', error);
              }
        }
         
        
      }
 
  return (
    <>

        {data?.length > 0 ? 
            data?.map((data) => 
        ( 
        
        <NavLink to={`/vacante-list/${data[0]}/${data[1]}`}> <div className='card-container' key={data[0]}>
            <div className='card-img-container'>
                <img className='card-img' src= {`/img/img_vacantes/${data[1]}.png`} alt={`${data[1]}img`} />    
            </div>
            <div className='info-card-container' >
                <div className='empresa-card'>
                    <div className='identificador-card' onClick={() => modificarCandidato(data[0])}>{`${data[1]} ID# ${data[0]}`} </div>
                </div>
             
            </div>
        </div></NavLink>
        )) 
        : <p>No existe una empresa con ese nombre</p>}


        
    </>
  )
}
