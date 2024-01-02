import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import '../styles/vacantesLista.css'
import { ModalVacante } from './ModalVacante'


export const VacanteLista = () => {
    const { id_cliente, nombre_cliente } = useParams();
    const [data, setData] = useState()
    const [searchName, setSearchName] = useState('')
    const [filterState, setFilterState] = useState({
        activas: false,
        finalizadas: false,
        canceladas: false,
        urgentes: false
      })
    const [selectedItems, setSelectedItems] = useState([])
    const [estado, setEstado] = useState(false)

    const [selectedVacante, setSelectedVacante] = useState()
      
    useEffect(() => {
        if(id_cliente === 'all'){
            if(filterState.activas){
                handleAll(searchName, 'A')
            } else if(filterState.finalizadas){
                handleAll(searchName, 'F')
            } else if(filterState.canceladas){
                handleAll(searchName, 'C')
            } else if (filterState.urgentes){
                handleAll(searchName, 'U')
            } else{
                handleAll(searchName, '')
            }            
        } else {
            handleVacante(searchName)
        }
        
    },[id_cliente, searchName, filterState])

    const handleVacante = async (search) => {
        const response = await axios.get(`http://localhost:8081/vacantes/id_cliente/${id_cliente}`,
        {withCredentials:true})

        if(search !== ''){
            const newArr = response.data.filter((obj) => obj.urgencia.toLowerCase().includes(search) || obj.nombre.toLowerCase().includes(search))
            setData(newArr)
        } else {
            setData(response.data)
        }
        console.log(data)
    }

    const handleAll = async (search, filter) => {
        try{
            const response = filter === 'U' ? await axios.get(`http://localhost:8081/vacantes/urgenciaAlta`,
            {withCredentials:true}) : filter === 'A' || filter === 'F' || filter === 'C' || filter === '' ? await axios.get(`http://localhost:8081/vacantes/all${filter}`,
            {withCredentials:true}) : console.log('Error en la peticion')
            if(search !== ''){
                const newArr = response.data.filter((obj) => obj.urgencia.toLowerCase().includes(search) || obj.nombre.toLowerCase().includes(search))
                setData(newArr)
            } else {
                setData(response.data)
            }
            console.log('Handle all: ', response.data)
        } catch(error){
            console.log('Error: ', error)
        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { value } = event.target;
        setSearchName(value)
    }

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        const updatedFilterState = {}      
        // Establecer el check seleccionado en true
        updatedFilterState[name] = checked      
        // Desactivar los otros checks
        Object.keys(filterState).forEach((filter) => {
          if (filter !== name) {
            updatedFilterState[filter] = false;
          }
        })      
        setFilterState(updatedFilterState)
    }


    const handleCheckboxChange = (event, item) => {
        const { checked } = event.target
        if (checked) {
          setSelectedItems((prevItems) => [...prevItems, item])
        } else {
          setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id))
        }
        console.log(selectedItems)
    }
      

    const exportPdf = async() =>{
        try{
            const response = await axios.post(`http://localhost:8081/export/pdf/vacantes`,
            selectedItems, {withCredentials: true, responseType: 'blob'}
        )
            // Verificar el estado de la respuesta
            console.log(response)
            if (response.status === 200) {
            // La respuesta se ha recibido correctamente
            // Puedes realizar alguna acción aquí, como abrir el PDF
    
            // Crear una URL de objeto para el Blob
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
    
            // Abrir el PDF en una nueva ventana o pestaña del navegador
            window.open(url);
    
            console.log('PDF exportado con éxito');
            } else {
            // La respuesta tiene un estado diferente si es necesario
            console.log('Estado de respuesta inesperado:', response.status);
            }
        } catch (error){
            console.log('Respuesta del servidor: ', error)
        }
    }

  return (
    <>
    <div className='vacantes-lista-container'>
        <div className='close-btn-vacante'>
                    <NavLink to='/reclutamiento'><button onClick={setSelectedItems}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-left"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21.5" x2="4.8" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
                        </button></NavLink> 
        </div>
    <div className='reclutamiento-container'>
        <div className='titulo-input-container'>
        <div className='vacantesabiertas'><h2>VACANTES</h2></div>
        {id_cliente !== 'all' ? <div className='card-img-container-vacante'>
            <img className='card-img-vacante' src= {nombre_cliente !== 'allVacantes' ? `/img/img_vacantes/${nombre_cliente}.png` : '/img/img_vacantes/todasempresas.png'} alt={`${nombre_cliente}img`} />    
            </div> : <div></div>}
        <form action="submit" className='reclutaminetolabel-vacantes' > 
            <input 
            type="text" 
            name="vacantes" 
            id="vacantes" 
            placeholder='Vacante, Urgencia...'
            value={searchName}
            onChange={handleChange}
            />
            <svg class="iconcandidatos" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <button type="button" class="agregar-reclu" onClick={() => setEstado(true)}>
                <span class="buttonagregar-reclu">Agregar</span>
                <span class="buttonmas-reclu"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
            
        </form>
            <div className="filter-checkboxes">
                <label>
                    <input
                    type="checkbox"
                    name="activas"
                    checked={filterState.activas}
                    onChange={handleFilterChange}
                    />
                    Activas
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="finalizadas"
                    checked={filterState.finalizadas}
                    onChange={handleFilterChange}
                    />
                    Finalizadas
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="canceladas"
                    checked={filterState.canceladas}
                    onChange={handleFilterChange}
                    />
                    Canceladas
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="urgentes"
                    checked={filterState.urgentes}
                    onChange={handleFilterChange}
                    />
                    Urgentes
                </label>
            </div>

        </div>
      </div>

         <div className='vacantes-table-container'>
            <table border={"0"}>
                    <thead>
                        <tr>
                            <th>SELECCIONAR</th>
                            <th id="idHeader"># ID</th>
                            <th id="nombreHeader">NOMBRE</th>
                            <th id='exp-sal'>FECHA INICIO</th>
                            <th id='tecnologia'>FECHA CIERRE</th>    
                            <th id="seniority">SENIORITY</th> 
                            <th id="rateHeader">RATE</th>
                            <th id='estadoHeader'>PAIS</th>  
                            <th id="reclutadoraHeader">SKILLS</th>
                            <th id="reclutadoraHeader">CANTIDAD</th>
                            <th id="accionesHeader">COMPUTADORA</th>
                            <th id="accionesHeader">URGENCIA</th>
                        </tr>
                    </thead>
                    <tbody>


    {data?.map((obj) => (
         
        <tr key={`${obj.id}`}>
            
        <td> <input
                type="checkbox"
                name="seleccionado"
                checked={selectedItems.some((item) => item.id === obj.id)}
                onChange={(e) => handleCheckboxChange(e, obj)}
             />
        </td>
        <td className='id' headers="idHeader" id='id'>{obj.id}</td>
        <td className='nombre' headers="nombreHeader" id='nombre'><NavLink to={`/vacante-info/${obj.id}/${obj.nombre}`}>{obj.nombre}</NavLink></td>
        <td className='expectativa-salarial' headers='exp-sal' id='exp-sal'>{obj.comienzo}</td>
        <td>{obj.cierre}</td>
        <td className='seniority' headers='seniorityHeader' id='seniority'>{obj.seniority}</td>        
        <td className='rate' headers='rateHeader' id='rate'>{obj.rate}</td>
        <td className='estado' headers='estadoHeader' id='estado'>actualizar campo back</td>        
        <td className='reclutadora' headers='reclutadoraHeader' id='reclutadora'>{obj.skills}</td>
        <td headers='acciones-header'>{obj.cantidad}</td>
        <td headers='acciones-header'>{obj.computadora}</td>
        <td headers='acciones-header'>{obj.urgencia === 'alta' ? <strong style={{ color: 'red' }}>{obj.urgencia.toUpperCase()}</strong> : obj.urgencia}</td>         
    </tr>
    
    ))}
            </tbody>                    
        </table>                    
    </div>
        <div className='pdf-container'>
            <button type="button" className="export-pdf" onClick={()=> exportPdf()}>
                <span class="buttonagregar">EXPORT</span>
                <span class="buttonmas"><svg viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>
        </div>
    </div>
    <div>footer </div>
    <ModalVacante estado={estado} setEstado={setEstado} selectedVacante={selectedVacante} setSelectedVacante={setSelectedVacante} />
    
    </>
  )
}
