import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/reclutamiento.css'
import { Vacantes } from './Vacantes'
import { ModalVacante } from './ModalVacante'

export const Reclutamiento = () => {

  const [estado, setEstado] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [modificar, setModificar] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [data, setData] = useState('')
    
useEffect(()=>{
  handleAll()
},[])

const handleChange = (event) => {
  event.preventDefault()
  const { value } = event.target;
  setSearchName(value);
}

const handleSearchBttn = (event) => {
  event.preventDefault()
  if(searchName !== ''){
    event.preventDefault()
    handleSearch()
} else {
    event.preventDefault()
    handleAll()
}
}

const handleAll = async() => {
  console.log('handleAll')
    try{
      const response = await axios.get(`http://localhost:8080/api/vacantes`,
          {withCredentials: true}
      );
      setData(response.data)
    } catch (error){
      console.error('Error al obtener los datos:', error);
    }
}

const handleSearch =() => {
          fetch(`http://localhost:8081/vacantes/nombre/${searchName}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
      .then((response) => response.json())
      .then((data) => {
      // Aquí puedes hacer algo con la respuesta del servidor si lo deseas
      if(data.status === 500){
        setData('')
      } else {
        const arrayData = Array.isArray(data) ? data : [data]
        console.log(arrayData)
        arrayData[0] !== null ? setData(arrayData) : setData(data)
      }
      console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
      console.error('Error al enviar los datos:', error);
      })
      setSearchName('')      
}

return (
    <div className='recl-cont'>
      <div className='reclutamiento-container'>
        <div className='vacantes-container'>
          <form action="submit" onSubmit={handleSearchBttn}> 
            <label htmlFor="vacantes"><h2>Vacantes Abiertas</h2></label>
            <input 
            type="text" 
            name="vacantes" 
            id="vacantes" 
            value={searchName}
            onChange={handleChange}
            />
            <button type='submit'>Buscar</button>
          </form>
        </div>
      </div>
      <div className='addNew-container'>
        <button className='add-new-candidato' onClick={()=> setEstado(true)}>+ Agregar</button>
      </div>
      <div className='multiple-card-container'>
        <Vacantes setSelectedCandidate={setSelectedCandidate} 
        setEstado={setEstado} 
        setModificar={setModificar} 
        searchName={searchName} 
        setSearchName={setSearchName}
        data={data} />

        <ModalVacante estado={estado} setEstado={setEstado} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} 
        modificar={modificar} setModificar={setModificar} />
      </div>
      
    </div>
  )
}
