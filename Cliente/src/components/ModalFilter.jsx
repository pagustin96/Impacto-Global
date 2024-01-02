import React, {useState} from 'react'
import axios from 'axios'
import '../styles/modalFiltros.css'

export const ModalFilter = ({filter, setFilter, setData, search, setSearch, setDataFilter, 
    handleTokenLogout, dataFilter }) => {
    const initialState = {
        id_cliente: null,
        id_reclutadora: null,
        perfil: null,
        seniority: null,
        id_idioma: null,
        nivel: null,
        id_estado: null,
    }


    const [filtros, setFiltros] = useState(initialState)
    const [activo, setActivo] = useState('')


    const handleChange = (event) =>{
        const { name, value } = event.target;
        setFiltros((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
          console.log(filtros)
    }

    const handleActivo = (event) => {
        event.preventDefault()
        const { value } = event.target;
        setActivo(value);
    }

    const handleFilter = async (search) => {
        const queryParams = new URLSearchParams();
      
        // Agregar los parámetros a la URL si están presentes en el estado
        if (filtros.id_cliente) queryParams.append('id_cliente', filtros.id_cliente);
        if (filtros.id_reclutadora) queryParams.append('id_reclutadora', filtros.id_reclutadora);
        if (filtros.perfil) queryParams.append('perfil', filtros.perfil);
        if (filtros.seniority) queryParams.append('seniority', filtros.seniority);
        if (filtros.id_idioma) queryParams.append('id_idioma', filtros.id_idioma);
        if (filtros.nivel) queryParams.append('nivel', filtros.nivel);
        if (filtros.id_estado) queryParams.append('id_estado', filtros.id_estado)
        // Agrega los demás parámetros de manera similar
      
        const queryString = queryParams.toString();
        const url = `http://localhost:8081/candidatos/filter/?${queryString}`;
        console.log(url)
        setFilter(false)
        try {
          const response = await axios.get(url, { withCredentials: true });
          
          let arrayFiltered = await isActive(response.data)

          const filterbyFilters = await arrayFiltered.filter((object) => object.nombre.toLowerCase().includes(search) || 
          object.apellido.toLowerCase().includes(search) || object.id.dni.toString().includes(search))
          setData(filterbyFilters)
          //setSearch('')
          setDataFilter({filter: false, data: ''})

        } catch (error) {
          console.log('Error al enviar los datos:', error);
          handleTokenLogout(error)
        }
      };


      const cleanState = () =>{
        setFilter(false)
        setFiltros(initialState)  
        setActivo('')      
      }

      const cleanFilter = () =>{
        setFiltros(initialState)  
        setActivo('') 
        setDataFilter({filter: false, data: ''})  
        console.log(dataFilter)
      }

      const isActive = (data) =>{
        if(activo === 'activo'){
            const filteredData = data.filter((item) => item.activo)
            return filteredData
        } else if(activo === 'inactivo'){
            const filteredData = data.filter((item) => !item.activo)
            return filteredData
        } else{
            return data
        }
    }

    


  return (
    <>
    {filter && 
        <div className='overlay'>
            <div className='modal-container'>
                <div className='encabezado-modal'>
                        <h3>FILTROS</h3>
                </div>
                <div className='close-btn'>
                    <button onClick={()=> cleanState()}>x</button>
                </div>
                <div className="filtros-container">
                    <select defaultValue='' name="id_cliente" id="id_cliente" onChange={(e) => handleChange(e)}>
                        <option value="">CLIENTE</option>
                        <option value="1">FIAT</option>
                        <option value="2">AGD</option>
                        <option value="3">CLARO</option>
                    </select>
                    <select name="id_reclutadora" id="id_reclutadora" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue="" disabled selected>RECLUTADORA...</option>
                        <option value="1">COTY</option>
                        <option value="2">FLOR</option>
                        <option value="3">GIULY</option>
                    </select>
                    <select name="perfil" id="perfil" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue='' disabled selected>PERFIL...</option>
                        <option value="backend">BACKEND</option>
                        <option value="frontend">FRONTEND</option>
                        <option value="fullstack">FULLSTACK</option>
                        <option value="analista">ANALISTA</option>
                    </select>
                    <select name="seniority" id="seniority" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue="" disabled selected>SENIORITY...</option>
                        <option value="Le">TRAINEE</option>
                        <option value="junior">JUNIOR</option>
                        <option value="semisenior">SEMISENIOR</option>
                        <option value="senior">SENIOR</option>
                    </select>
                    <select name="id_idioma" id="id_idioma" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue="" disabled selected>IDIOMA...</option>
                        <option value="1">ESPAÑOL</option>
                        <option value="2">FRANCES</option>
                        <option value="3">INGLES</option>
                        <option value="4">ITALIANO</option>
                    </select>
                    <select name="nivel" id="nivel" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue="" disabled selected>NIVEL...</option>
                        <option value="alto">ALTO</option>
                        <option value="bajo">BAJO</option>
                    </select>
                    <select name="id_estado" id="id_estado" onChange={(e) =>  handleChange(e)}>
                        <option defaultValue="" disabled selected>ESTADO...</option>
                        <option value="1" >1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <select name="id_estado" id="id_estado" onChange={(e) =>  handleActivo(e)}>
                        <option defaultValue="" disabled selected>ACTIVO / INACTIVO...</option>
                        <option value="activo" >ACTIVO</option>
                        <option value="inactivo">INACTIVO</option>
                        <option value="todos">TODOS</option>
                    </select>
                </div>
                <div className='container-btn-filter'>
                    <button type="button" class="agregar"  onClick={() => handleFilter(search)}>
                        <span class="buttonagregar">Filtrar</span>
                        <span class="buttonmas"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
                    </button>
                </div>
                
                
            </div>
        </div>
    }
    </>
  )
}
