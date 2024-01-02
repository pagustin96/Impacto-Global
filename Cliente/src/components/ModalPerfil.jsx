import React, { useState, useEffect } from 'react'

export const ModalPerfil = ({activo, setActivo}) => {

    const initialFormData = {
        email: '',
        newEmail: '',
        pwd: '',
        repeatPwd: ''
    }
    const [formData, setFormData] = useState(initialFormData)

    useEffect(() => {
        verifyEqualPwd()
    },[formData.repeatPwd])

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
          console.log(formData)
    }

    const handleQuery = (event) =>{
        event.preventDefault();
       
      }

    const verifyEqualPwd = () => {
        if(formData.pwd === formData.repeatPwd){
            return true
        } else if (formData.pwd !== formData.repeatPwd){
            const pwdNotEqual = document.getElementById('rptPwd')

            const pwdNotEqualDiv = document.createElement('div')  
            pwdNotEqualDiv.textContent = 'Las contraseñas deben se iguales'
            pwdNotEqualDiv.style.color = 'red'

            pwdNotEqual.appendChild(pwdNotEqualDiv);
            setTimeout(()=>{
                pwdNotEqual.removeChild(pwdNotEqualDiv)
            }, 2000)

            return false
        }
    }


  return (
    <>
    { activo && 
    <div className='overlay'>
        <div className='modal-container'>
            <div className='encabezado-modal'>
                <h3>EDITAR EMAIL</h3>
            </div>
            <div className='close-btn'>
                    <button onClick={() => setActivo(false)}>x</button>
            </div>
            <form className='form-modal' onSubmit={handleQuery} autocomplete="new-password">
                <table>
                    <tbody>
                        <tr className='tere'>
                            <td className='tede-input'>
                            <input
                            placeholder='Email...'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autocomplete="new-password"
                            />
                            </td>
                            <td className='tede-input'>
                            <input
                            placeholder='Nuevo Email...'
                            type="email"
                            id="newEmail"
                            name="newEmail"
                            value={formData.newEmail}
                            onChange={handleChange}
                            required
                            />
                            </td>
                            <td className='tede-input'>
                            <input
                            placeholder='Contraseña...'
                            type="password"
                            id="pwd"
                            name="pwd"
                            value={formData.pwd}
                            onChange={handleChange}
                            required
                            autocomplete="new-password"
                            />
                            </td>
                            <td className='tede-input' id='rptPwd'>
                            <input
                            placeholder='Confirmar contraseña...'
                            type="password"
                            id="repeatPwd"
                            name="repeatPwd"
                            value={formData.repeatPwd}
                            onChange={handleChange}
                            required
                            
                            /> <div ></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className='modal-btn-add'>
                 Enviar</button>
            </form>
            
        </div>
    </div>
    }
    </>
    
  )
}
