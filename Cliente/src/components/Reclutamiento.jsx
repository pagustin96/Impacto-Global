import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/reclutamiento.css'
import { Vacantes } from './Vacantes'
import { NavLink } from 'react-router-dom'


export const Reclutamiento = () => {

  const [estado, setEstado] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [modificar, setModificar] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [dataFilter, setDataFilter] = useState({filter: false, data: ''})
  
  useEffect(()=>{
    
  },[])

const handleChange = (event) => {
  event.preventDefault()
  const { value } = event.target;
  setSearchName(value);
}

const handleSearchBttn = (event) => { /*
  event.preventDefault()
  if(searchName !== ''){
    event.preventDefault()
    handleSearch()
} else {
    event.preventDefault()
    //handleAll()
}*/
}



const handleSearch =() => {
 /* console.log('data.data: ', data)
  if(searchName === ''){
    setDataFilter({filter: false, data: ''})
    return
}
  const array = data.filter((object) => object.nombre?.toLowerCase().includes(searchName) || 
        object.seniority?.toLowerCase().includes(searchName) || object.id?.toString().includes(searchName))
  setDataFilter({filter: true, data: array})
  console.log(dataFilter)*/
        
}

return (
    <div className='recl-cont'>
      <div className='reclutamiento-container'>
        <div className='titulo-input-container'>
        <div className='vacantesabiertas'><h2>VACANTES ABIERTAS</h2></div>
          <form action="submit" className='reclutaminetolabel' onSubmit={handleSearchBttn}> 
            <input 
            type="text" 
            name="vacantes" 
            id="vacantes" 
            placeholder='Empresa...'
            value={searchName}
            onChange={handleChange}
            />
            <svg class="iconcandidatos" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            
          </form>
        </div>
      </div>
      <div className='addNew-container'>

      </div>
      {searchName === '' ? <div className='todasempresas-container'>
        <div className='ticket'>
          <NavLink to={`/vacante-list/all/allVacantes`}><div className='card-container-todasempresas' >
              <div className='card-img-container-todasempresas'>
                  <img className='card-img' src= {`/img/img_vacantes/todasempresas.png`} alt='claroimg' />    
              </div>
              <div className='info-card-container' >
                  <div className='empresa-card'>
                
                  </div>
              
              </div>
          </div></NavLink>
        </div>

      </div> : <div></div>}

      <div className='multiple-card-container'>
        <Vacantes setSelectedCandidate={setSelectedCandidate} 
        setEstado={setEstado} 
        setModificar={setModificar} 
        searchName={searchName} 
        setSearchName={setSearchName}
        dataFilter={dataFilter} 
     />

      </div>
      
    </div>
  )
}
