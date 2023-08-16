import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/register.css'
import { NavLink } from 'react-router-dom'

export const Register = () => {
    const [loginData, setLoginData] = useState({
        email:'',
        contraseña:'',
        nombre:'',
        apellido:'',
    })
    //const [data, setData] = useState('')

    const getUser = async (e) => {
        // Llamada a la API en localhost:8081
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:8080/api/user/register`,{ 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
              })
            const responseData = await response.json();
            console.log(responseData)
        }
        catch(error){
            console.error('Error al obtener los datos:', error);
        }        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          [name]: value,
        }));
    }

    console.log(loginData)

  return (
    <div className='container-register'>
        <img className='img-ar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/>
        <div className='form-container'>
            <form action='submit' onSubmit={getUser}>
                <div className='iniSes-container'>Registrarse</div>
                <div className='email-container'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Ingresa tu mail...' onChange={handleChange} value={loginData.email}/>
                </div>
                <div className='password-container'>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id='contraseña' name='contraseña' placeholder='Ingresa tu contraseña' onChange={handleChange} value={loginData.contraseña}/>
                </div>
                <div className='password-container'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id='nombre' name='nombre' placeholder='Ingresa tu nombre...' onChange={handleChange} value={loginData.nombre}/>
                </div>
                <div className='password-container'>
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id='apellido' name='apellido' placeholder='Ingresa tu apellido...' onChange={handleChange} value={loginData.apellido}/>
                </div>
                <button type="submit" className='iniSes-btn'>REGISTRARSE</button>
                <NavLink to={'/login'}><button type="submit" className='forgetpsw-btn' >YA TIENES UNA CUENTA?</button></NavLink>
            </form>
        </div>
    </div>
  )
}
