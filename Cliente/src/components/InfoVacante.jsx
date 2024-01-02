import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Modal } from './Modal'
import axios from 'axios';
import '../styles/infoVacante.css'
import { set } from 'react-hook-form';
import { ModalVacante } from './ModalVacante';


export const InfoVacante = () => {
    const { id_vacante, nombre_vacante } = useParams();
    const [data, setData] = useState()
    const [dataCandidatos, setDataCandidatos] = useState()
    const [dataJustificacion, setDataJustificacion] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [estado, setEstado] = useState(false) // modal vacante
    const [estadoCand, setEstadoCand] = useState(false) // modal candidato
    const [ modificar, setModificar] = useState(false) // habilita para modificar la vacante

    const array = {
      reclutadora: ["Giulliana Carnevalle", "Constanza Giordano", "Florencia Brunori"],
      pais: ["Argentina", "Uruguay", "Estados Unidos", "Chile", "Brasil"],
      cliente: ["Claro", "Fiat", "Naranja", "Paypal", "AGD", "Tips", "Taller"]
  }
    useEffect(() => {
        handleVacante()
        handleJustificacion()
    },[])

    const handleGoBack = () => {
        window.history.back();
      };

    const handleVacante = async() => {
        try{
            const response = await axios.get(`http://localhost:8081/vacantes/${id_vacante}`,
            {withCredentials: true})
            setData([response.data])
            console.log(response.data)

            const responseCandidatos = await axios.get(`http://localhost:8081/vacantes/allCandidatos/${id_vacante}`,
            {withCredentials: true})
            setDataCandidatos(responseCandidatos.data)
            setIsLoading(false);
            console.log(responseCandidatos)
        } catch (error){
            console.log('Respuesta del servidor: ', error)
        }
    }

    const handleJustificacion = async()=>{
      try{
        const response = await axios.get(`http://localhost:8081/vacantes/justificacion/${id_vacante}`,
            {withCredentials: true})
            setDataJustificacion([response.data])
            console.log(response.data)
      }catch(error){
            console.log('Error: ', error)
      }
    }

const modifVacante = () => {
  setEstado(true)
  setModificar(true)
}


  return (
    <div className='infoVacantes-container'>
      <div className='close-btn-vacante'>
                    <NavLink to='/reclutamiento'><button onClick={handleGoBack}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-left"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21.5" x2="4.8" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
                      </button></NavLink> 
        </div>

      <div className='datos-vacante-wrapper'>
        <div className='info-vacante-datos'>
            <div className='info-vacantes-datos-titulo'>DATOS</div>

        {
        Array.isArray(data) && data.length > 0 ? (
          data.map((obj) => (
            <>
            <div className='data-divisor-container' >
              <div className='divisor'>
                <div>VACANTE: {obj.nombre.toUpperCase()}</div>
                <div>CANTIDAD: {obj.cantidad}</div>
                <div>CLIENTE: {obj.idCliente ? obj.idCliente : obj.idCompania}</div>
                <div>COMIENZO: <strong style={{ color: 'green' }}>{obj.comienzo}</strong></div>
                <div>CIERRE:  <strong style={{ color: 'red' }}>{obj.cierre}</strong> </div>
                <div>RATE: {obj.rate} </div>
              </div>
              <div className='divisor'>
                <div>SENIORITY: {obj?.seniority?.toUpperCase()} </div>
                <div>SKILLS: {obj.skills? obj.skills.toUpperCase() : 'No especificado'} </div>
                <div>IDIOMA: {obj.idIdioma}</div>
                <div>COMPUTADORA: {obj.computadora ? obj.computadora.toUpperCase() : 'NO'}</div>
                <div>URGENCIA: {obj.urgencia ? obj.urgencia === 'alta' ? <strong style={{ color: 'red' }}>{obj.urgencia.toUpperCase()}</strong> : obj.urgencia : 'No especificado'} </div>
              </div>
            </div>
              </>  
          ))
        ) : 'No hay info disponible..'      
        
      }
       <div className='bttn-modificar-vacante-list'>
                <button type="button" class="agregar-reclu" onClick={() => modifVacante()}>
                <span class="buttonagregar-reclu">Modificar</span>
                <span class="buttonmas-reclu"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
              </div>
       </div>

      
        <div className='info-vacante-datos-estado'>
           <div>
          <div className='info-vacantes-datos-titulo'>ESTADO</div>
          <div className='estado-actual'>ESTADO ACTUAL: {`${ dataJustificacion !== '' ? dataJustificacion : 'No especificado'}`}</div>
        </div>
        <div className='bttn-modificar-vacante-list'>
              <button type="button" class="agregar-reclu" /*onClick={() => setEstado(true)}*/>
                <span class="buttonagregar-reclu">Editar</span>
                <span class="buttonmas-reclu"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
              </button>
        </div>
          
        
      
      </div>
      </div>
      <div className='info-vacante-datos-candidato'>
        <div className='info-vacantes-datos-titulo'>CANDIDATOS:</div>
          <ul className='lista-candidatos-infovacante'>
          {isLoading? 'Cargando...' : Array.isArray(dataCandidatos) && dataCandidatos.length > 0 ? (
            dataCandidatos.map((candidato) => (
              <li key={candidato.id.dni} >
                <strong>ID: </strong> {candidato.id.dni}
                <br />
                <strong>País: </strong> {candidato.id.idPais}
                <br />
                <strong >Nombre: </strong>{candidato.nombre}
                <br />
                <br />
                {/* Agrega más campos aquí */}
              </li>
              
            ))
          ) : (
            ' Esta vacante no posee candidatos asignados.'
          )}
        </ul>
        <div className='bttn-modificar-vacante-list-candidato'>
                <button type="button" class="agregar-reclu" onClick={() => setEstadoCand(true)}>
                <span class="buttonagregar-reclu">Agregar</span>
                <span class="buttonmas-reclu"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
              </div>
        </div>
        <ModalVacante id_vacante={id_vacante} estado={estado} setEstado={setEstado} data={data} modificar={modificar} setModificar={setModificar} />
        <Modal estado={estadoCand} setEstado={setEstadoCand} array={array} />
    </div>
  )
}
