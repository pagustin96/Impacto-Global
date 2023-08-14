import React, {useState, useEffect} from 'react'
import '../styles/modal.css'

export const Modal = ({estado, setEstado, selectedCandidate, setSelectedCandidate, modificar, setModificar, render, setRender}) => {

  const [formData, setFormData] = useState({
        id:'',
        nombre: '',
        apellido: '',
        cliente: '',
        perfil:'',
        seniority:'',
        ningles:'',
        rate:'',
        estado:'',
        contratado:'',
        reclutadora:''        
    })

    const cleanState = () =>{
        setEstado(false)
        setModificar(false)
        setFormData({
        id:'',
        nombre: '',
        apellido: '',
        cliente: '',
        perfil:'',
        seniority:'',
        ingles:'',
        rate:'',
        estado:'',
        contratado:'',
        reclutadora:''
      })
      setSelectedCandidate(null)
    }

    useEffect(() => {
      if (selectedCandidate) {
        // Si hay un candidato seleccionado, establece el estado inicial de formData con los valores del candidato seleccionado.
        setFormData({
          id: selectedCandidate.id || '',
          nombre: selectedCandidate.nombre || '',
          apellido: selectedCandidate.apellido || '',
          cliente: selectedCandidate.cliente || '',
          perfil: selectedCandidate.perfil || '',
          seniority: selectedCandidate.seniority || '',
          ningles: selectedCandidate.ningles || '',
          rate: selectedCandidate.rate || '',
          estado: selectedCandidate.estado || '',
          contratado: selectedCandidate.contratado || '',
          reclutadora: selectedCandidate.reclutadora || ''
        });
      }
    }, [selectedCandidate]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }

    const handleQuery = (event) =>{
      event.preventDefault();
      setRender(true)
      if(modificar){
        handleModify()
      } else{
        handleSubmit(event)
      }
    }

    
    const handleModify = () =>{

      fetch(`http://localhost:8081/candidatos/update/${formData.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Aquí puedes hacer algo con la respuesta del servidor si lo deseas
          console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
          console.error('Error al enviar los datos:', error);
        });
        // Limpia el formulario después del envío
        setFormData({
          id:'',
          nombre: '',
          apellido: '',
          cliente: '',
          perfil:'',
          seniority:'',
          ningles:'',
          rate:'',
          estado:'',
          contratado:'',
          reclutadora:''
        });
        setModificar(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del formulario a través de una llamada a la API o hacer lo que necesites con ellos.
        // Realizar la solicitud POST con fetch
    fetch('http://localhost:8081/candidatos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Aquí puedes hacer algo con la respuesta del servidor si lo deseas
          if(data.status === 500){
            alert("El email ya esta registrado!!")
          }
          console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
          console.error('Error al enviar los datos:', error);
        });
        console.log(formData);
        // Limpia el formulario después del envío
        
        setFormData({
          id:'',
          nombre: '',
          apellido: '',
          cliente: '',
          perfil:'',
          seniority:'',
          ningles:'',
          rate:'',
          estado:'',
          contratado:'',
          reclutadora:''
        });
      };

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
                    <button onClick={()=> cleanState()}>x</button>
                </div>
                <form className='form-modal' onSubmit={handleQuery}>
                <table>
                  <tbody>

                    <tr className='tere'>


                        <td className='tede-input'>
                            <input
                            placeholder='Nombre...'
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            />
                          </td>

                      <td className='tede-input'>
                      <input
                      placeholder='Apellido...'
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        />
                      </td>                       
                         
                      <td className='tede-input'>
                        <input
                          placeholder='Cliente...'
                          type="text"
                          id="cliente"
                          name="cliente"
                          value={formData.cliente}
                          onChange={handleChange}
                          required
                          />
                      </td>
          
                      <td className='tede-input'>
                        <input
                        placeholder='Perfil...'
                          type="text"
                          id="perfil"
                          name="perfil"
                          value={formData.perfil}
                          onChange={handleChange}
                          required
                          />
                      </td>                       
               
                        <td className='tede-input'>
                          <input
                          placeholder='Seniority...'
                          type="text"
                          id="seniority"
                          name="seniority"
                          value={formData.seniority}
                          onChange={handleChange}
                          required
                          />
                        </td>

                        <td className='tede-input'>
                          <input
                          placeholder='Ingles...'
                          type="text"
                          id="ningles"
                          name="ningles"
                          value={formData.ningles}
                          onChange={handleChange}
                          required
                          />
                        </td>
                      
                        <td className='tede-input'>
                          <input
                          placeholder='Rate...'
                          type="number"
                          id="rate"
                          name="rate"
                          value={formData.rate}
                          onChange={handleChange}
                          required
                          />
                        </td>
          
                        <td className='tede-input'>
                          <input
                          placeholder='Estado...'
                          type="text"
                          id="estado"
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                          required
                          />
                        </td>

                       <td className='tede-input'>
                        <input
                        placeholder='Contratado...'
                          type="text"
                          id="contratado"
                          name="contratado"
                          value={formData.contratado}
                          onChange={handleChange}
                          required
                          />
                       </td>

                      <td className='tede-input'>
                        <input
                        placeholder='Reclutadora'
                          type="text"
                          id="reclutadora"
                          name="reclutadora"
                          value={formData.reclutadora}
                          onChange={handleChange}
                          required
                          />
                      </td>                        
                    

                    </tr>
                  </tbody>
                </table>
                
                    
                    
                      
                  <button type="submit" className='modal-btn-add'>
                  {modificar? "Modificar" : "Agregar"}</button>
                      
                    
                </form>
            </div>
        </div>
        }
    </>
  )
}
