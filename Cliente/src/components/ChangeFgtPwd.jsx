import React, {useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
import axios from 'axios'

export const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [pwdData, setPwdData] = useState({
        pwd: '',
        confirmPwdData: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPwdData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        })
        )
    }

    const handleSetPWd = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(`http://localhost:8081/cambiarPwd`,
            pwdData)
            console.log(response)
        } catch (error){
            console.log('Respuesta del servidor: ', error)
        }
    }

  return (
    <div className='container-login'>
    {loading && <div className='overlay-loader'><FadeLoader color="red" size={40}/></div>} 
        
    <NavLink to="/"> <img className='img-ar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/> </NavLink>
        <div className='form-container-login'>
            <form action="submit" onSubmit={handleSetPWd}>
                <div className='iniSes-container'>Iniciar sesion</div>
                    <div className='password-container'>
                        <label htmlFor="contraseña">Contraseña Nueva</label>
                        <input
                        type='password' 
                        id='pwd' 
                        name='pwd'
                        value={pwdData.pwd}
                        onChange={handleChange} 
                        required
                        placeholder='Ingresa tu contraseña'/>
                    </div>
                    <div className='password-container'>
                        <label htmlFor="contraseña">Confirma la nueva Contraseña</label>
                        <input
                        type='password' 
                        id='pwd' 
                        name='pwd'
                        value={pwdData.confirmPwdData}
                        onChange={handleChange} 
                        required
                        placeholder='Ingresa tu contraseña'/>
                    </div>
                    <button type="submit" className='login-btn' >CAMBIAR CONTRASEÑA</button>
               
            </form>
        </div>
    </div>
  )
}
