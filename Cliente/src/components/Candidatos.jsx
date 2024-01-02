import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/candidatos.css'
import { Modal } from './Modal';
import axios from 'axios'
import { ModalFilter } from './ModalFilter';
import { ImPencil } from "react-icons/im";
import { TiUserDeleteOutline } from "react-icons/ti";



export const Candidatos = () => {
    const [render, setRender] = useState(false)
    const [data, setData] = useState(null) //array con los candidatos
    const [estado, setEstado] = useState(false) //Abrir modal add
    
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [modificar, setModificar] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)

    const [dataFilter, setDataFilter] = useState({filter: false, data: ''})
    const [filter, setFilter] = useState(null) // Abrir modal filtro
    const [search, setSearch] = useState('')  //Palabras de la barra de busqueda para filtrar

    const [selectedItems, setSelectedItems] = useState([])

    const array = {
        reclutadora: ["Giulliana Carnevalle", "Constanza Giordano", "Florencia Brunori"],
        pais: ["Argentina", "Uruguay", "Estados Unidos", "Chile", "Brasil"],
        cliente: ["Claro", "Fiat", "Naranja", "Paypal", "AGD", "Tips", "Taller"]
    }
    

    const navigate = useNavigate();

    useEffect(() => {
        
        if(deleteUser){
            setDeleteUser(false)
        }
        if(render){
            setRender(false)
        }  
    if(!dataFilter.filter){
        handleAll()
    }   
    }, [estado, deleteUser, render]);

    useEffect(() => {
        handleSearch()
        handleTokenLogout()
    },[search])


    const handleTokenLogout = (error) => {
        if(error && error.response.status === 401){
            alert('SU SESION A EXPIRADO!')
            navigate('/login')
        }
    }  

    const modificarCandidato= (item)=> {
        setSelectedCandidate(item)
        setEstado(true)
        setModificar(true)
    }

    const handleAll = async () => {
        
        try {
            const response = await axios.get('http://localhost:8081/candidatos/all',
            {withCredentials: true})
            /*response.data.sort((a,b) => {
                return a.nombre.localeCompare(b.nombre)
            })*/
            setData(response.data)
            console.log(response)
        } catch (error){
            console.log(error.response.status)
            handleTokenLogout(error)
            
        }
    }; 
    
    const handleAllA = async () => {
        
        try {
            const response = await axios.get('http://localhost:8081/candidatos/allA',
            {withCredentials: true})
            setData(response.data)
            console.log(response)
        } catch (error){
            console.log(error)
            handleTokenLogout(error)
        }
    }; 

    const handleAllB = async () => {
        
        try {
            const response = await axios.get('http://localhost:8081/candidatos/allB',
            {withCredentials: true})
            setData(response.data)
            console.log(response)
        } catch (error){
            console.log(error)
            handleTokenLogout(error)
        }
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
            const response = await axios.post(`http://localhost:8081/export/pdf/candidatos?dataUrl=http://localhost:8081/candidatos/all`,
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
        


    const handleDelete = async (dni, id_pais) =>{
        const check = window.confirm("Deseas eleminar al candidato?")
        
        if(check){
            try{
                const response = await axios.put(`http://localhost:8081/candidatos/delete/${dni}/${id_pais}`,
                {}, {withCredentials: true})
                console.log(response)
            } catch(error){
                console.log('Error al enviar los datos:', error)
                handleTokenLogout(error)
            };
            setDeleteUser(true)
        }
        
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { value } = event.target;
        setSearch(value);
        console.log(search)
    }

    const handleSearchBttn = (event) => {
        if(search !== ''){
            event.preventDefault()
            handleSearch()
        } else {
            event.preventDefault()
            setDataFilter({filter: false, data: ''})
            handleAll()
        }
    }

    const handleSearch = () => {
        if(search === ''){
            setDataFilter({filter: false, data: ''})
            return
        }
        const values = search.split(' ')
        
        const array = data.filter((object) => values.length > 1 ? (object.nombre.toLowerCase().includes(values[0]) && object.apellido.toLowerCase().includes(values[1])) : 
        object.nombre.toLowerCase().includes(search) || 
        object.apellido.toLowerCase().includes(search) || object.id.dni.toString().includes(search))
        setDataFilter({filter: true, data: array})
        console.log(dataFilter)
        /*for(let i = 0; i < values.length; i++){
            data.map((object) => object.nombre.toLowerCase().includes(values[i]) || 
            object.apellido.toLowerCase().includes(values[i]) || object.id.dni.toString().includes(values[i]))
        }*/
}

    return (
    <div className='candidatos-container'>
        <div className='recl-cand-cont'>
        <div className='candidatostext'><h2>CANDIDATOS</h2></div>
            <div className='reclutamiento-container'>
                    <form action="submit" className='candidatoslabel' onSubmit={handleSearchBttn}>
                        <input 
                        type="text"
                        placeholder='Nombre, Apellido, Id...' 
                        name="search" 
                        id="search" 
                        value={search}
                        onChange={ handleChange }/>
                        <svg class="iconcandidatos" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    </form>
            </div>
    </div>
    <div className='addNew-container'>
        <button type="button" class="agregar" onClick={()=> setEstado(true)}>
        <span class="buttonagregar">Agregar</span>
        <span class="buttonmas"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
        <button type="button" class="agregar" onClick={()=> setFilter(true)}>
        <span class="buttonagregar">Filtrar</span>
        <span class="buttonmas"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
        </button>

    </div>
        
        <div className='candidatos-table-container'>
            <table border={"0"}>
                    <thead>
                        <tr>
                            <th>SELECCIONAR</th>
                            <th id="idHeader"># ID</th>
                            <th id="nombreHeader">NOMBRE</th>
                            <th id='exp-sal'>PERFIL</th>
                            <th id='tecnologia'>TECNOLOGIA</th>    
                            <th id="seniority">SENIORITY</th> 
                            <th id="rateHeader">LINKEDIN</th>
                            <th id='estadoHeader'>ESTADO</th>  
                            <th id="reclutadoraHeader">RECLUTADORA</th>
                            <th id="accionesHeader"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFilter.filter ?
                        dataFilter.data.length === 0 ? <td className='id' headers="idHeader" id='id'>No hay resultados</td> :

dataFilter.data.map((item) =>( 
                            
    item &&
    <tr key={`${item.id.dni}-${item.id.idPais}`}>
        <td> <input
                type="checkbox"
                name="seleccionado"
                checked={selectedItems.some((obj) => obj.id === item.id)}
                onChange={(e) => handleCheckboxChange(e, item)}
             />
        </td>
        <td className='id' headers="idHeader" id='id'>{item.id.dni}-{item.id.idPais}</td>
        <td className='nombre' headers="nombreHeader" id='nombre'>{item.nombre && item.apellido ? `${item.nombre} ${item.apellido}` : "no data"}</td>
        <td className='expectativa-salarial' headers='exp-sal' id='exp-sal'>{item.perfil}</td>
        <td><select name="" id=""><option value="Javascript">Javascript</option><option value="Java">Java</option></select></td>
        <td className='seniority' headers='seniorityHeader' id='seniority'>{item.seniority}</td>
        
        <td className='rate' headers='rateHeader' id='rate'>{item.linkedin}</td>
        <td className='estado' headers='estadoHeader' id='estado'>{item.activo? 'Activo' : 'Inactivo'}</td>
        
        <td className='reclutadora' headers='reclutadoraHeader' id='reclutadora'>{array.reclutadora[item.id_reclutadora]}</td>
        <td headers='acciones-header'>
            <button className='modify' onClick={()=>modificarCandidato(item)}><div><ImPencil /></div></button>
            &nbsp;
            <button className='delete' onClick={()=> handleDelete(item.id.dni, item.id.idPais)}> <TiUserDeleteOutline /></button>
        </td>
                
    </tr>

)):
                        Array?.isArray(data) && data.length > 0 ?

                        data.map((item) =>( 
                            
                            item &&
                            <tr key={`${item.id.dni}-${item.id.idPais}`}>
                                <td> <input
                                    type="checkbox"
                                    name="seleccionado"
                                    checked={selectedItems.some((obj) => obj.id === item.id)}
                                    onChange={(e) => handleCheckboxChange(e, item)}
                                    />
                                </td>
                                <td className='id' headers="idHeader" id='id'>{item.id.dni}-{item.id.idPais}</td>
                                <td className='nombre' headers="nombreHeader" id='nombre'>{item.nombre && item.apellido ? `${item.nombre} ${item.apellido}` : "no data"}</td>
                                <td className='expectativa-salarial' headers='exp-sal' id='exp-sal'>{item.perfil}</td>
                                <td>No especificado</td>
                                <td className='seniority' headers='seniorityHeader' id='seniority'>{item.seniority}</td>
                                
                                <td className='rate' headers='rateHeader' id='rate'><a className='link-linkedin' target='_blank' rel="noopener noreferrer" href={`https://www.linkedin.com/in${item.linkedin}`}>{item.linkedin}</a></td>
                                <td className='estado' headers='estadoHeader' id='estado'>{item.activo? 'Activo' : 'Inactivo'}</td>
                                
                                <td className='reclutadora' headers='reclutadoraHeader' id='reclutadora'>{array.reclutadora[item.id_reclutadora]}</td>
                                <td headers='acciones-header'>
                                    <button className='modify' onClick={()=>modificarCandidato(item)}> <div><ImPencil /></div> </button>
                                    &nbsp;
                                    <button className='delete' onClick={()=> handleDelete(item.id.dni, item.id.idPais)}> <TiUserDeleteOutline /> </button>
                                </td>
                                        
                            </tr>

                        )) : (
                            <tr>
                                <td colSpan="5">No se encontraron candidatos</td>
                            </tr>
                            )
                        }
                    </tbody>
                    
            </table>
            
        </div>
        <div className='pdf-container'>
            <button type="button" className="export-pdf" onClick={()=> exportPdf()}>
            <span class="buttonagregar">EXPORT</span>
            <span class="buttonmas"><svg viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>
        </div>
        
        <Modal modificar={modificar} setModificar={setModificar} estado={estado} setEstado={setEstado} 
        selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} 
        render={render} setRender={setRender} handleTokenLogout={handleTokenLogout} array={array}/>

        <ModalFilter filter={filter} setFilter={setFilter} setData={setData} search={search} setSearch={setSearch} 
        setDataFilter={setDataFilter} dataFilter={dataFilter} handleTokenLogout={handleTokenLogout} handleSearch={handleSearch} />
    </div>
    )
};
