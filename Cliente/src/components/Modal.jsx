import React, {useState, useEffect } from 'react';
import '../styles/modal.css'
import axios from 'axios'
import { useForm } from "react-hook-form";


export const Modal = ({estado, setEstado, estadoCand, setEstadocand, selectedCandidate, setSelectedCandidate, modificar, setModificar, render, setRender, handleTokenLogout, array}) => {
  const initialFormState = {
  candidato:{ 
    id:
     {
      dni:'',
      idPais:''
    },   
    nombre: '',
    apellido: '',
    perfil:'',
    seniority:'',
    linkedin:'',
    email_personal:'',
    telefono:'',
    nacionalidad:'',
    nacimiento:'',
    expSalarial:'',
    id_direccion: '',
    id_reclutadora:'',
    id_cliente:'',
    id_contrato_exterior:'' },
    cpd: {
      provincia: '',
      ciudad: '',
      calle: '',
      numero: '',
      barrio: '',
      cp: ''
    }
  }
  const initialIdiomaState = {
    dni: '',
    idPais: '',
    idioma: '',
    nivel: ''
  }

  const curriculumForm = {
    file: '',
    idPais: '',
    dni: ''
  }

  const [counter, setCounter] = useState(0)
  const [formData, setFormData] = useState(initialFormState)
  const [vacantes, setvacantes] = useState()
  const [selectedVacante, setSelectedVacante] = useState(false)
  const [idiomas, setIdiomas] = useState([]) 
  const [curriculum, setCurriculum] = useState(null) 


  console.log(selectedVacante)
    const cleanState = () =>{
      setEstado(false)
      //setModificar(false)
      setFormData(initialFormState)
      //setSelectedCandidate(null)
      setCounter(0)
      setIdiomas([])
    }

    useEffect(() => {
      if (selectedCandidate) {
        // Si hay un candidato seleccionado, establece el estado inicial de formData con los valores del candidato seleccionado.
        setFormData({
         candidato: {
          id:{
            dni:selectedCandidate.id.dni || '',
              idPais: selectedCandidate.id.idPais || ''
              },
          nombre: selectedCandidate.nombre || '',
          apellido: selectedCandidate.apellido || '',
          perfil: selectedCandidate.perfil || '',
          seniority:selectedCandidate.seniority || '',
          linkedin: selectedCandidate.linkedin || '',
          email_personal:selectedCandidate.email_personal || '',
          telefono: selectedCandidate.telefono || '',
          nacionalidad: selectedCandidate.nacionalidad || '',
          nacimiento: selectedCandidate.nacimiento || '',
          expSalarial: selectedCandidate.expSalarial || '',
          id_direccion: selectedCandidate.id_direccion || '',
          id_reclutadora: selectedCandidate.id_reclutadora || '',
          id_cliente: selectedCandidate.id_cliente || '',
          id_contrato_exterior: selectedCandidate.id_contrato_exterior || '' 
        },
      cpd:{
        provincia: selectedCandidate.provincia || '',
        ciudad: selectedCandidate.ciudad || '',
        calle: selectedCandidate.calle || '',
        numero: selectedCandidate.nnumero || '',
        barrio: selectedCandidate.barrio || '',
        cp: selectedCandidate.cp || ''
      }});
      }
      handleGetVacantes()
     
    }, [selectedCandidate])

    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
      curriculumForm.file = file
      curriculumForm.dni = formData.candidato.id.dni
      curriculumForm.idPais = formData.candidato.id.idPais
      setCurriculum(file);
    };
  
    const handleGetVacantes = async () => {
      try {const vacantesResponse = await axios.get(`http://localhost:8081/vacantes/allA`,
      {withCredentials: true})
      console.log(vacantesResponse.data)
      setvacantes(vacantesResponse.data)
    } catch (error){
      console.log('Respuseta del servidor: ', error)
    }
    }

   const addIdioma = () => {
    

      const div = document.createElement('div')
      div.className = 'tede-wraper'
      const label = document.createElement('label')
      label.appendChild(document.createTextNode('Idioma'))
      const input = document.createElement('input')
      input.style.marginBottom = '10px'
      
      input.setAttribute('juancarlo', counter)
      const inputNivel = document.createElement('input')
      inputNivel.setAttribute('juancarlo', counter)


      input.value = idiomas.idioma? idiomas.idioma : ''
      input.type = 'text'
      input.name = 'idioma'
      input.placeholder = 'Idioma...'
      input.addEventListener('input', (e) => handleChangeIdioma(e))
     

      inputNivel.value = idiomas.nivel? idiomas.nivel : ''
      inputNivel.type = 'text'
      inputNivel.name = 'nivel'
      inputNivel.placeholder = 'nivel'
      inputNivel.addEventListener('input', (e) => handleChangeIdioma(e))

      div.appendChild(label)
      div.appendChild(input)
      div.appendChild(inputNivel)

      const contenedor = document.getElementById('tere')
      const nodeBefore = document.getElementById('add-idioma')
      contenedor.insertBefore(div, nodeBefore)
      
      idiomas.push(initialIdiomaState)
      setCounter(counter + 1)
      console.log(counter)
    } 

  const handleChangeIdioma = (event) => {
    const {name, value} = event.target;
    const id = event.target.attributes.juancarlo.value
    const newArray = [...idiomas]; //copio array original
    const newObj = newArray[id] // copio objeto
    console.log('new Array: ', newArray)
    console.log('newObj: ', newObj)
    console.log('id: ', id)
    console.log('name: ', name, 'value:', value)
    if(name === 'idioma'){
      newObj.idioma = value
    } else if(name === 'nivel'){
      newObj.nivel = value
    }


      newObj.dni = formData.candidato.id.dni
      newObj.idPais = formData.candidato.id.idPais
    
    newArray[id] = newObj

    setIdiomas(newArray) 
  } 

  console.log(idiomas)


    const handleChange = (event) => {
      const { name, value } = event.target;
     
      // Separa el nombre del campo en sección y nombre de campo
      const [section, fieldName] = name.split('.');
     console.log(section, fieldName)
      // Actualiza el estado en función de la sección y el nombre del campo
      if (section === "candidato") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          candidato: {
            ...prevFormData.candidato,
            [fieldName]: value,
          },
        }));
      } else if (section === 'id'){

         /* if(idiomas.length > 0){
            setIdiomas((prevIdiomas) => ({
              ...prevIdiomas,
              [fieldName] : value
            }))
          }*/
        
          setFormData((prevFormData) => ({
            ...prevFormData,
            candidato: {
              ...prevFormData.candidato,
              id:{
                ...prevFormData.candidato.id,
                [fieldName]: value
              }  
            }
          }))
      } else if (section === "cpd") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          cpd: {
            ...prevFormData.cpd,
            [fieldName]: value,
          },
        }));
      }
    };
    


    const handleQuery = (event) =>{
      event.preventDefault();
      setRender(true)
      if(modificar){
        handleModify()
      } else{
        handleSubmit(event)
      }
    }

    
    const handleModify = async () =>{

      try{
        const response = await axios.put(`http://localhost:8081/candidatos/update/${formData.candidato.id.dni}/${formData.candidato.id.idPais}`, 
      formData, {withCredentials: true}
      )
      console.log('Respuesta del servidor:', response);
      } 
      catch (error){
          console.error('Error al enviar los datos:', error);
          handleTokenLogout(error)
        }
         
        
        // Limpia el formulario después del envío
        setFormData(initialFormState);
        setModificar(false)
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      console.log("formData: ",formData)
      console.log('formIdioma: ', idiomas)
      console.log('cv:', curriculum)
      idiomas.pop()

      try{
      const response = await axios.post(`http://localhost:8081/candidatos/add/${selectedVacante}`, 
      formData, {withCredentials: true}
      )
      console.log(response)
      } catch (error){
        console.log('Error al enviar candidato: ', error)
      }
/*
      try{
      const responseIngles = await axios.post(`http://localhost:8081/candidatos/add/idiomas/${formData.candidato.id.dni}/${formData.candidato.id.idPais}`,
      idiomas, {withCredentials: true}
      )
      console.log(responseIngles)
      } catch (error){
        console.log('Error al enviar idioma: ', error)
      }

      try{
      const responseCurriculum = await axios.post(`http://localhost:8081/curriculum/add`,
      curriculum,{withCredentials: true})
      console.log(responseCurriculum);
      setFormData(initialFormState)
        } catch (error){
          console.error('Error al enviar el curriculum:', error);
          handleTokenLogout(error)
        }
        // Limpia el formulario después del envío
        //setFormData(initialFormState);*/
      }

  return (
    <>
        {estado &&
        <div className='overlay'>
            <div className='modal-container'>
                <div className='encabezado-modal'>
                    <h3>
                    {modificar? "Modificar Candidato" : "Agregar Candidato"}
                    </h3>
                </div>
                 <div className='close-btn'>
                    <button onClick={()=> cleanState()}>X</button>
                </div>
                <form className='form-modal' onSubmit={handleQuery}>
               

                    <div className='tere' id='tere'>

                    <div className='tede-wraper'>
                      
                        <input
                          type="file"
                          accept='.pdf'
                          id="cv"
                          name="cv"
                          onChange={handleFileChange}
                          />
                    </div>

                    <div className='tede-wraper'>
                      <label htmlFor="">Vacante:  </label>
                            <select id='vacantes-modal'  value={selectedVacante}
                              onChange={(e) => setSelectedVacante(e.target.value)} >
                              { vacantes?.map((opt) => (
                                 <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                 
                              ))}
                            </select>
                          </div>


                        <div className='tede-wraper'>
                          <label htmlFor="">Nombre</label>
                            <input
                            placeholder='Nombre...'
                            type="text"
                            id="nombre"
                            name="candidato.nombre"
                            value={formData.candidato.nombre}
                            onChange={handleChange}
                            required
                            />
                          </div>

                      <div className='tede-wraper'>
                      <label htmlFor="">Apellido</label>
                      <input
                      placeholder='Apellido...'
                        type="text"
                        id="apellido"
                        name="candidato.apellido"
                        value={formData.candidato.apellido}
                        onChange={handleChange}
                        required
                        />
                      </div>                       
                         
                      <div className='tede-wraper'>
                      <label htmlFor="">Cliente</label>
                        <input
                          placeholder='Cliente...'
                          type="text"
                          id="id_cliente"
                          name="candidato.id_cliente"
                          value={array.cliente[formData.candidato.id_cliente]}
                          onChange={handleChange}
                          required
                          />
                      </div>
          
                      <div className='tede-wraper'>
                      <label htmlFor="">Perfil</label>
                        <input
                        placeholder='Perfil...'
                          type="text"
                          id="perfil"
                          name="candidato.perfil"
                          value={formData.candidato.perfil}
                          onChange={handleChange}
                          required
                          />
                      </div>                       
               
                        <div className='tede-wraper'>
                        <label htmlFor="">Seniority</label>
                          <input
                          placeholder='Seniority...'
                          type="text"
                          id="seniority"
                          name="candidato.seniority"
                          value={formData.candidato.seniority}
                          onChange={handleChange}
                          required
                          />
                        </div>

                        
                      
                        <div className='tede-wraper'>
                        <label htmlFor="">Email</label>
                          <input
                          placeholder='Email...'
                          type="email"
                          id="email_personal"
                          name="candidato.email_personal"
                          value={formData.candidato.email_personal}
                          onChange={handleChange}
                          required
                          />
                        </div>
          
                        <div className='tede-wraper'>
                        <label htmlFor="">Expectativa Salarial</label>
                          <input
                          placeholder='Expectativa salarial...'
                          type="text"
                          id="expSalarial"
                          name="candidato.expSalarial"
                          value={formData.candidato.expSalarial}
                          onChange={handleChange}
                          required
                          />
                        </div>

                       <div className='tede-wraper'>
                       <label htmlFor="">DNI</label>
                        <input
                        placeholder='Dni...'
                          type="number"
                          id="dni"
                          name="id.dni"
                          value={formData.candidato.id.dni}
                          onChange={handleChange}
                          required
                          />
                       </div>

                       <div className='tede-wraper'>
                          <label htmlFor="">Pais</label>
                        <input
                        placeholder='Pais...'
                          type="text"
                          id="idPais"
                          name="id.idPais"
                          value={array.pais[formData.candidato.id.idPais]}
                          onChange={handleChange}
                          required
                          />
                       </div>

                      <div className='tede-wraper'>
                      <label htmlFor="">Reclutadora</label>
                        <input
                        placeholder='Reclutadora'
                          type="text"
                          id="id_reclutadora"
                          name="candidato.id_reclutadora"
                          value={array.reclutadora[formData.candidato.id_reclutadora]}
                          onChange={handleChange}
                          required
                          />
                      </div>      

                      <div className='tede-wraper'>
                      <label htmlFor="">Fecha de nacimiento</label>
                        <input
                        placeholder='Fecha de nacimiento..'
                          type="date"
                          id="nacimiento"
                          name="candidato.nacimiento"
                          value={formData.candidato.nacimiento}
                          onChange={handleChange}
                          required
                          />
                      </div>

                      <div className='tede-wraper'>
                      <label htmlFor="">Nacionalidad</label>
                        <input
                        placeholder='Nacionalidad'
                          type="text"
                          id="nacionalidad"
                          name="candidato.nacionalidad"
                          value={formData.candidato.nacionalidad}
                          onChange={handleChange}
                          required
                          />
                      </div>  

                      <div className='tede-wraper'>
                      <label htmlFor="">Telefono</label>
                        <input
                        placeholder='Telefono...'
                          type="text"
                          id="telefono"
                          name="candidato.telefono"
                          value={formData.candidato.telefono}
                          onChange={handleChange}
                          required
                          />
                      </div>     

                       <div className='tede-wraper'>
                       <label htmlFor="">Contrato Exterior</label>
                        <input
                        placeholder='Contrato exterior...'
                          type="text"
                          id="id_contrato_exterior"
                          name="candidato.id_contrato_exterior"
                          value={formData.candidato.id_contrato_exterior === 1? 'SI' : 'NO'}
                          onChange={handleChange}
                          required
                          />
                      </div>     

                      <div className='tede-wraper'>
                      <label htmlFor="">Linkedin</label>
                        <input
                        placeholder='Linkedin...'
                          type="text"
                          id="linkedin"
                          name="candidato.linkedin"
                          value={formData.candidato.linkedin}
                          onChange={handleChange}
                          required
                          />
                      </div>                  


                     <div className='tede-wraper'>
                     <label htmlFor="">Provincia</label>
                        <input
                        placeholder='Provincia...'
                          type="text"
                          id="provincia"
                          name="cpd.provincia"
                          value={formData.cpd.provincia}
                          onChange={handleChange}
                          required
                          />
                      </div>   

                      <div className='tede-wraper'>
                      <label htmlFor="">Ciudad</label>
                        <input
                        placeholder='Ciudad...'
                          type="text"
                          id="ciudad"
                          name="cpd.ciudad"
                          value={formData.cpd.ciudad}
                          onChange={handleChange}
                          required
                          />
                      </div>     

                      <div className='tede-wraper'>
                      <label htmlFor="">Calle</label>
                        <input
                        placeholder='Calle...'
                          type="text"
                          id="calle"
                          name="cpd.calle"
                          value={formData.cpd.calle}
                          onChange={handleChange}
                          required
                          />
                      </div> 

                      <div className='tede-wraper'>
                      <label htmlFor="">Numero</label>
                        <input
                        placeholder='Numero...'
                          type="number"
                          id="numero"
                          name="cpd.numero"
                          value={formData.cpd.numero}
                          onChange={handleChange}
                          required
                          />
                      </div> 
                      
                      <div className='tede-wraper'>
                      <label htmlFor="">Barrio</label>
                        <input
                        placeholder='Barrio...'
                          type="text"
                          id="barrio"
                          name="cpd.barrio"
                          value={formData.cpd.barrio}
                          onChange={handleChange}
                          required
                          />
                      </div> 

                      <div className='tede-wraper'  id='ultimo-form'>
                      <label htmlFor="">Codigo Postal</label>
                        <input
                        placeholder='Cp...'
                          type="number"
                          id="cp"
                          name="cpd.cp"
                          value={formData.cpd.cp}
                          onChange={handleChange}
                          required
                          />
                      </div>

                    </div>

                    <button type="button" class="agregar" onClick={addIdioma}>
                    <span class="buttonagregar">Idioma</span>
                    <span class="buttonmas"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                    </button>                    
        
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
