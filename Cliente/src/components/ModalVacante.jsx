import React from 'react'
import { useEffect , useState } from 'react'

export const ModalVacante = ({estado, setEstado, selectedCandidate, setSelectedCandidate, modificar, setModificar}) => {

    const [formData, setFormData] = useState({
        id:'',
        empresa: '',
        nombre: '',
        seniority: '',
        skills: '',
        cantidad:'',
        comienzo:'',
        ningles: '',
        rate:'',
        estado:'',
        cierre:'',
      })
    

    useEffect(()=>{
        if (selectedCandidate) {
            // Si hay un candidato seleccionado, establece el estado inicial de formData con los valores del candidato seleccionado.
            setFormData({
              id: selectedCandidate.id || '',
              empresa: selectedCandidate.empresa || '',
              nombre: selectedCandidate.nombre || '',
              seniority: selectedCandidate.seniority || '',
              skills: selectedCandidate.skills || '',
              cantidad: selectedCandidate.cantidad || '',
              comienzo: selectedCandidate.comienzo || '',
              ningles: selectedCandidate.ningles || '',
              rate: selectedCandidate.rate || '',
              estado: selectedCandidate.estado || '',
              cierre: selectedCandidate.cierre || ''
            });
          }
    },[selectedCandidate])

    const cleanState = () =>{
        setEstado(false)
        //setModificar(false)
        setFormData({
        id:'',
        empresa: '',
        nombre: '',
        seniority: '',
        skills: '',
        cantidad:'',
        comienzo:'',
        ningles: '',
        rate:'',
        estado:'',
        cierre:''
      })
      setSelectedCandidate(null)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }

    const handleQuery = (event) =>{
        event.preventDefault();
        //setRender(true)
        if(modificar){
            handleModify()
        } else{
            handleSubmit(event)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del formulario a través de una llamada a la API o hacer lo que necesites con ellos.
        // Realizar la solicitud POST con fetch
    fetch('http://localhost:8081/vacantes/add', {
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
            empresa: '',
            nombre: '',
            seniority: '',
            skills: '',
            cantidad:'',
            comienzo:'',
            ningles: '',
            rate:'',
            estado:'',
            cierre:''
        });
      };


    const handleModify = () =>{

        fetch(`http://localhost:8081/vacantes/update/${formData.id}`, { //modificar para hace put por id
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
            empresa: '',
            nombre: '',
            seniority: '',
            skills: '',
            cantidad:'',
            comienzo:'',
            ningles: '',
            rate:'',
            estado:'',
            cierre:''
          });
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
     

     <form className='form-modal' onSubmit={handleQuery}>
                <table>
                  <tbody>

                    <tr className='tere'>

                        <td className='tede-input'>
                            <input
                            placeholder='Empresa...'
                            type="text"
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            required
                            />
                          </td>

                      <td className='tede-input'>
                      <input
                      placeholder='Vacante...'
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
                        placeholder='Skills...'
                          type="text"
                          id="skills"
                          name="skills"
                          value={formData.skills}
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
                          placeholder='Cantidad'
                          type="number"
                          id="cantidad"
                          name="cantidad"
                          value={formData.cantidad}
                          onChange={handleChange}
                          required
                          />
                        </td>

                        <td className='tede-input'>
                          <input
                          placeholder='Comienzo...'
                          type="text"
                          id="comienzo"
                          name="comienzo"
                          value={formData.comienzo}
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
                        placeholder='Cierre'
                          type="text"
                          id="cierre"
                          name="cierre"
                          value={formData.cierre}
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
