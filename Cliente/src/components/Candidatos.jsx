import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/candidatos.css'
import { Modal } from './Modal';
import axios from 'axios'

export const Candidatos = () => {
    const [render, setRender] = useState(false)
    const [data, setData] = useState(null)
    const [estado, setEstado] = useState(false)
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [modificar, setModificar] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [searchId, setSearchId] = useState('')

    const navigate = useNavigate();

    useEffect(() => {

        if(deleteUser){
            setDeleteUser(false)
        }
        if(render){
            setRender(false)
        }  

      handleAll()

      handleToken()
      
      }, [estado, deleteUser, render]);

    const handleToken = () => {
       
        if(data && data.error === 'Necesitas incluir el access_token en la cookie'){
            alert('SU SESION A EXPIRADO!')
            navigate('/login')
        }
    }  

    const modificarCandidato= (item)=> {
        setSelectedCandidate(item)
        setEstado(true)
        setModificar(true)
    }

    const handleAll =async () => {
        // Llamada a la API en localhost:8081
        try {
            const response = await axios.get('http://localhost:8080/api/candidatos',{withCredentials: true})
            setData(response.data)
            console.log(response)
        } catch (error){
            console.log(error)
        }
    };      
        

   
    const handleDelete = async (id) =>{
        
        try{
            const response = await axios.delete('http://localhost:8080/api/candidatos',{withCredentials: true})
        } catch(error){
            console.log('Error al enviar los datos:', error)
        };
          setDeleteUser(true)
      }

    const handleChange = (event) => {
        event.preventDefault()
        const { value } = event.target;
        setSearchId(value);
    }

    const handleSearchBttn = (event) => {
        if(searchId !== ''){
            event.preventDefault()
            handleSearch()
        } else {
            event.preventDefault()
            handleAll()
        }
    }

    const handleSearch =async(e) => {
        //e.preventDefault()
        try{
            const response = await axios.get(`http://localhost:8080/api/candidatos/id/${searchId}`,{withCredentials: true})
            const arrayData = Array.isArray(response) ? response : [response]
            console.log(arrayData)
            arrayData[0] !== null ? setData(arrayData) : setData(response)
            console.log('Respuesta del servidor:', response);
            
        } catch(error){
            console.log('Error al enviar los datos:', error)
        };
     }
    

  return (
    <div className='candidatos-container'>
        <div className='recl-cand-cont'>
            <div className='reclutamiento-container'>
                
                    <form action="submit" className='vacantes-container' onSubmit={handleSearchBttn}>
                        <label htmlFor="searchForId"><h2>Candidatos</h2></label>
                        <input 
                        type="text" 
                        name="searchForId" 
                        id="searchForId" 
                        value={searchId}
                        onChange={handleChange}/>
                        <button type='submit'>Buscar</button>
                    </form>

            </div>
           
    </div>
    <div className='addNew-container'>
        <button className='add-new-candidato' onClick={()=> setEstado(true)}>+ Agregar</button>
    </div>
        
        <div className='candidatos-table-container'>
            <table border={"0"}>
                    <thead>
                        <tr>
                            <th id="idHeader"># ID</th>
                            <th id="nombreHeader">NOMBRE</th>
                            <th id='exp-sal'>EXPECTATIVA SALARIAL</th>
                            <th id='tecnologia'>TECNOLOGIA</th>
                            
                            <th id="seniority">SENIORITY</th>
                            
                            <th id="rateHeader">RATE</th>
                            <th id='estadoHeader'>ESTADO</th>
                            
                            <th id="reclutadoraHeader">RECLUTADORA</th>
                            <th id="accionesHeader"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array?.isArray(data) ?

                        data.map((item) =>( 
                            item.activo &&
                            <tr key={item.id}>
                                <td className='id' headers="idHeader" id='id'>{item.id}</td>
                                <td className='nombre' headers="nombreHeader" id='nombre'>{item.nombre && item.apellido ? `${item.nombre} ${item.apellido}` : "no data"}</td>
                                <td className='expectativa-salarial' headers='exp-sal' id='exp-sal'></td>
                                <td><select name="" id=""><option value="Javascript">Javascript</option><option value="Java">Java</option></select></td>
                                <td className='seniority' headers='seniorityHeader' id='seniority'>{item.seniority}</td>
                                
                                <td className='rate' headers='rateHeader' id='rate'>{item.rate}</td>
                                <td className='estado' headers='estadoHeader' id='estado'>{item.estado}</td>
                                
                                <td className='reclutadora' headers='reclutadoraHeader' id='reclutadora'>{item.reclutadora}</td>
                                <td headers='accionesHeader'>
                                    <button className='modify' onClick={()=>modificarCandidato(item)}>MODIFICAR</button>
                                    &nbsp;
                                    <button className='delete' onClick={()=> handleDelete(item.id)}>ELIMINAR</button>
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

        <Modal modificar={modificar} setModificar={setModificar} estado={estado} setEstado={setEstado} 
        selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} render={render} setRender={setRender}/>
       
    </div>
  )
};
