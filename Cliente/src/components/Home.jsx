import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.css'
import { CandidatoPostulados } from './CandidatoPostulados';
import { ModalHomePostulados } from './ModalHomePostulados';
import { CandidatosContratados } from './CandidatosContratados';
import { CandidatosEnEspera } from './CandidatosEnEspera';
import { CandidatosRechazados } from './CandidatosRechazados';
import { ModalHomeContratados } from './ModalHomeContratados';
import { ModalHomeEnEspera } from './ModalHomeEnEspera';
import { ModalHomeRechazados }  from './ModalHomeRechazados';

export const Home = () => {

const [data, setData] = useState()
const [dataEntrevistas, setDataEntrevistas] = useState()
const [estadoPostulados, setEstadoPostulados] = useState(false)
const [contratados, setContratados] = useState(false)
const [enEspera, setEnEspera] = useState(false)
const [rechazados, setRechazados] = useState(false)
const [url, setUrl] = useState('')

  useEffect(() =>{
    handleLast10()
    handleEntrevistasAll()
  },[])

const handleLast10 = async() => {
            
  try {
      const response = await axios.get(`http://localhost:8081/home/conteoCards`,
      {withCredentials: true})
      setData(response.data)
      console.log(response.data)
  } catch ( error) {
      console.log('Respuesta del servidor: ', error)
  }
}

  const handleEntrevistasAll = async () => {
   try { const response = await axios.get(`http://localhost:8081/home/allEntrevistas`,
    {withCredentials: true})
    console.log(response.data)
    setDataEntrevistas(response.data)
  } catch (error) {
    console.log('Respuesta del servidor: ', error)
  }
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
        <div onClick={() => setEstadoPostulados(true)}><CandidatoPostulados data={data} titulo={'CANDIDATOS POSTULADOS'} estadoPostulados={estadoPostulados} /></div>
        <div onClick={() => setContratados(true)}><CandidatosContratados data={data} titulo={'CANDIDATOS CONTRATADOS'} contratados={contratados} /></div>
        <div onClick={() => setEnEspera(true)}><CandidatosEnEspera data={data} titulo={'CANDIDATOS EN ESPERA'} enEspera={enEspera} /></div>
        <div onClick={() => setRechazados(true)}><CandidatosRechazados data={data} titulo={'CANDIDATOS RECHAZADOS'} rechazados={rechazados} /></div>
      </div>
      <div className='saludo'><h2>REGISTRO DE ENTREVISTAS</h2></div>
      <div class="registro-entrevistas"></div>
      <form action="submit" className='registro-entrevistas'>
        <label htmlFor=""></label>
        <input type="text" 
        placeholder='Buscar...'/>
        <svg class="iconhome" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <button type="button" class="agregar" >
        <span class="buttonagregar">Agregar</span>
        <span class="buttonmas"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
      </form>
      <div className='div-flex-container'>
      <div className='vacantes-table-container'>
            <table border={"0"}>
                    <thead>
                        <tr>
                            <th>SELECCIONAR</th>
                            <th id="idHeader"># ID</th>
                            <th id="nombreHeader">DESCRIPCION</th>
                            <th id='exp-sal'>FECHA</th>
                            <th id='tecnologia'>SUELDO PRETENDIDO</th>    
                            <th id="seniority">TECNOLOGIA</th> 
                            <th id="accionesHeader">DNI</th>
                        </tr>
                    </thead>
                    <tbody>

      {dataEntrevistas? dataEntrevistas.map((obj) => (

          <tr key={`${obj.id}`}>
            
          <td> <input
                  type="checkbox"
                  name="seleccionado"     
               />
          </td>
          <td className='id' headers="idHeader" id='id'>{obj.id}</td>
          <td className='nombre' headers="nombreHeader" id='nombre'>{obj.descripcion}</td>
          <td className='expectativa-salarial' headers='exp-sal' id='exp-sal'>{obj.fecha}</td>
          <td>{obj.salario}</td>
          <td className='seniority' headers='seniorityHeader' id='seniority'>{obj.tecnologia}</td>        
          <td className='rate' headers='rateHeader' id='rate'>{obj.dniCandidato}</td>
          
      </tr>

        )) : 'No data disponible'}
           </tbody>                    
        </table>                    
      </div>
      </div>
      <ModalHomePostulados estadoPostulados={estadoPostulados} setEstadoPostulados={setEstadoPostulados}
        contratados={contratados} setContratados={setContratados} enEspera={enEspera} setEnEspera={setEnEspera}
        rechazados={rechazados} setRechazados={setRechazados} />
       <ModalHomeContratados contratados={contratados} setContratados={setContratados} />
       <ModalHomeEnEspera enEspera={enEspera} setEnEspera={setEnEspera} />
       <ModalHomeRechazados rechazados={rechazados} setRechazados={setRechazados} />

    </div>
   <div> </div>
  </>
  )
}
