import React from 'react'
import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/modalVacante.css'

export const ModalVacante = ({id_vacante, estado, setEstado, selectedVacante, data, setSelectedVacante, modificar, setModificar}) => {

  const InitialFormData = {
    vacante: {
    id: '',
    nombre: '',
    seniority: '',
    cantidad:'',
    rate:'',
    comienzo:'',
    cierre: '',
    skills: '',
    computadora: '',
    idCliente: '',
    idCompania: null,
    idIdioma: '',
    modulo: '',
    urgencia: 'ALTA'
  }, 
  cliente: {
    id:'',
    nombre: ''
  }
  }

  const [formData, setFormData] = useState()
  const [modifyData, setModifyData] = useState()
    
    const navigate = useNavigate();



    useEffect(()=>{
        if (selectedVacante){
            // Si hay un candidato seleccionado, establece el estado inicial de formData con los valores del candidato seleccionado.
            setFormData({
              id: selectedVacante.id || '',
              idCliente: selectedVacante.idCliente || '',
              nombre: selectedVacante.nombre || '',
              seniority: selectedVacante.seniority || '',
              skills: selectedVacante.skills || '',
              cantidad: selectedVacante.cantidad || '',
              comienzo: selectedVacante.comienzo || '',
              idIdioma: selectedVacante.idIdioma || '',
              rate: selectedVacante.rate || '',
              estado: selectedVacante.estado || '',
              cierre: selectedVacante.cierre || '',
              modulo: selectedVacante.modulo || '',
              urgencia: selectedVacante.urgencia || ''
            });
          } else if(data){
            console.log(data)
            setFormData({
              vacante: {
              id: data.id || '',
              nombre: data[0].nombre || '',
              seniority: data[0].seniority || '',
              cantidad: data[0].cantidad || '',
              rate: data[0].rate || '',
              comienzo: data[0].comienzo ||'',
              cierre: data[0].cierre || '',
              skills: data[0].skills ||'',
              computadora: data[0].computadora ||'',
              idCliente: data[0].idCliente,
              idCompania: data[0].idCompania,
              idIdioma: data[0].idIdioma || '',
              modulo: data[0].modulo || '',
              urgencia: data[0].urgencia || ''
            }
            })
          }
          handleToken()
    },[selectedVacante, estado, data])

    const cleanState = () =>{
        setEstado(false)
        //setModificar(false)
        setFormData(InitialFormData)
      //setSelectedVacante(null)
    }

    const handleToken = () => {
       
      if(formData && formData.error === 'Necesitas incluir el access_token en la cookie'){
          alert('SU SESION A EXPIRADO!')
          navigate('/login')
      }
  } 

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [section, field] = name.split('.'); // Divide el nombre en sección y campo
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value,
      },
    }));
    console.log(formData)
  };

    const handleQuery = (event) =>{
        event.preventDefault();
        //setRender(true)
        if(modificar){
            handleModify(event)
        } else{
            handleSubmit(event)
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          const response = await axios.post(`http://localhost:8081/vacantes/add`,
              formData, {withCredentials: true}
          );
          console.log(response)         
        } catch (error){
          console.error('Error al enviar los datos:', error);
        }

        // Limpia el formulario después del envío
        
        //setFormData(InitialFormData);
      };


    const handleModify = async (event) =>{
      event.preventDefault();
      const formModify = {
        id: data.id,
        nombre: formData.vacante.nombre,
        seniority: formData.vacante.seniority,
        cantidad: formData.vacante.cantidad,
        rate: formData.vacante.rate,
        comienzo: formData.vacante.comienzo,
        cierre: formData.vacante.cierre,
        skills: formData.vacante.skills,
        computadora: formData.vacante.computadora,
        idCliente: formData.vacante.idCliente,
        idCompania: formData.vacante.idCompania,
        idIdioma: formData.vacante.idIdioma,
        modulo: formData.vacante.modulo,
        urgencia: formData.vacante.urgencia
      }
      try{
        const response = await axios.put(`http://localhost:8081/vacantes/update/${id_vacante}`,
        formModify,{ withCredentials: true })
        console.log(response)
      }catch(error){
        console.log('Error: ',error)
      }        
          setModificar(false)
      }

  return (
   <>

   {estado && 
      <div className='overlay'>
    <div className='modal-container'>
        <div className='encabezado-modal'>
            <h3>
                {modificar? "Modificar Vacante" : "Agregar Vacante"}
            </h3>
        </div>
            <div className='close-btn'>
                <button onClick={()=> cleanState()}>x</button>
            </div>
     

     <form className='form-modal-vacante' onSubmit={handleQuery}>
              

                    <div className='tere'>

                        <div className='tede-wraper'>
                          <label htmlFor="">Nombre</label>
                            <input
                            placeholder='Nombre de la vacante...'
                            type="text"
                            id="nombre"
                            name="vacante.nombre"
                            value={formData.vacante.nombre}
                            onChange={handleChange}
                            required
                            />
                          </div>

                      <div className='tede-wraper'>
                        <label>Cliente</label>
                      <input
                      placeholder='Cliente...'
                        type="text"
                        id="cliente"
                        name="cliente.nombre"
                        value={formData.vacante.idCliente}
                        onChange={handleChange}
                        required
                        />
                      </div>                       

                      <div className='tede-wraper'>
                        <label>Seniority</label>
                        <input
                        placeholder='Seniority...'
                          type="text"
                          id="seniority"
                          name="vacante.seniority"
                          value={formData.vacante.seniority}
                          onChange={handleChange}
                          required
                          />
                      </div>

                      <div className='tede-wraper'>
                        <label>Computadora</label>
                        <input
                        placeholder='Computadora...'
                          type="text"
                          id="computadora"
                          name="vacante.computadora"
                          value={formData.vacante.computadora}
                          onChange={handleChange}
                          required
                          />
                      </div>

                      <div className='tede-wraper'>
                        <label>Skills</label>
                        <input
                        placeholder='Skills...'
                          type="text"
                          id="skills"
                          name="vacante.skills"
                          value={formData.vacante.skills}
                          onChange={handleChange}
                          required
                          />
                      </div>    

                      <div className='tede-wraper'>
                        <label>Idioma</label>
                        <input
                        placeholder='Idioma...'
                          type="text"
                          id="idIdioma"
                          name="vacante.idIdioma"
                          value={formData.vacante.idIdioma}
                          onChange={handleChange}
                          required
                          />
                      </div>                   

                        <div className='tede-wraper'>
                          <label>Cantidad</label>
                          <input
                          placeholder='Cantidad'
                          type="number"
                          id="cantidad"
                          name="vacante.cantidad"
                          value={formData.vacante.cantidad}
                          onChange={handleChange}
                          required
                          />
                        </div>

                        <div className='tede-wraper'>
                          <label>Comienzo</label>
                          <input
                          placeholder='Comienzo...'
                          type="date"
                          id="comienzo"
                          name="vacante.comienzo"
                          value={formData.vacante.comienzo}
                          onChange={handleChange}
                          required
                          />
                        </div>

                        <div className='tede-wraper'>
                        <label>Cierre</label>
                        <input
                        placeholder='Cierre'
                          type="date"
                          id="cierre"
                          name="vacante.cierre"
                          value={formData.vacante.cierre}
                          onChange={handleChange}
                          required
                          />
                       </div>

                        <div className='tede-wraper'>
                          <label>Rate</label>
                          <input
                          placeholder='Rate...'
                          type="number"
                          id="rate"
                          name="vacante.rate"
                          value={formData.vacante.rate}
                          onChange={handleChange}
                          required
                          />
                        </div>

                        <div className='tede-wraper'>
                          <label>Modulo</label>
                          <input
                          placeholder='Modulo...'
                          type="text"
                          id="modulo"
                          name="vacante.modulo"
                          value={formData.vacante.modulo}
                          onChange={handleChange}
                          required
                          />
                        </div>

                        <div className='tede-wraper'>
                          <label>Urgencia</label>
                          <select
                          placeholder='Urgencia...'
                          id="urgencia"
                          name="vacante.urgencia"
                          value={formData.vacante.urgencia}
                          onChange={(e) => handleChange(e)}
                          required
                          >
                            <option selected value="alta">Alto</option>
                            <option value="media">Medio</option>
                            <option value="baja">Bajo</option>
                          </select>
                        </div>

                    </div>
      
                    <button type="submit" class="agregar">
                    <span class="buttonagregar"> {modificar? "Modificar" : "Agregar"}</span>
                    <span class="buttonmas"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                    </button>
     
                    
                </form>
                </div>
   </div>

   }
   </>
  )
}
