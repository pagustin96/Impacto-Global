import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/register.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import BeatLoader from "react-spinners/BeatLoader";

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        usuario: { 
            email:'',
            pwd:''},
        reclutadora: {
            nombre:'',
            apellido:''
        }
    })

    const registerUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const response = await axios.post(`http://localhost:8081/register`, 
            loginData);
            console.log(response)
            /*const successfull = document.getElementById('register-successfull-container')

            const succesfullDiv = document.createElement('div')  
            succesfullDiv.textContent = response.data.toString()
            succesfullDiv.style.color = 'red'

            successfull.appendChild(succesfullDiv);*/
            setLoading(false)
            /*setTimeout(()=>{
                successfull.removeChild(succesfullDiv)
            }, 3000)*/
        }
        catch(error){
            setLoading(false)
            console.error('Error al obtener los datos:', error.response.data);
            /*const successfull = document.getElementById('register-successfull-container')

            const succesfullDiv = document.createElement('div')  
            succesfullDiv.textContent = error.response.data.toString()
            succesfullDiv.style.color = 'red'

            successfull.appendChild(succesfullDiv);
            setTimeout(()=>{
                successfull.removeChild(succesfullDiv)
            }, 3000)*/
        }        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
      
        if (name === "nombre" || name === "apellido") {
          setLoginData((prevFormData) => ({
            ...prevFormData,
            reclutadora: {
              ...prevFormData.reclutadora,
              [name]: value,
            },
          }));
        }else if ( name === 'email' || name === 'pwd'){
          
                setLoginData((prevFormData) => ({
                    ...prevFormData,
                    usuario: {
                        ...prevFormData.usuario,
                        [name]: value,
                    }

                }))
        } else {
          setLoginData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      };

    console.log(loginData)

    return (
        <div className='container-register'>
             {loading && <div className='overlay-loader'><BeatLoader color="red" size={17}/></div>}
            <img className='imgregister' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/>
            <div className='form-container-register'>
            <form class="form" onSubmit={registerUser}>
            <p>Registrarse</p>
            <div class="group">
            <input class="main-input" type="email" name='email' required onChange={handleChange} value={loginData.email}/>
            <span class="highlight-span"></span>
            <label class="lebal-email">Email</label>
            </div>
            <div class="container-1">
            <div class="group">
                <input class="main-input" type="password" name='pwd' required onChange={handleChange} value={loginData.pwd}/>
                <span class="highlight-span"></span>
                <label class="lebal-email">Contraseña</label>
            </div>
        </div>
        <div class="container-2">
            <div class="group">
                <input class="main-input" name='nombre' type="text" required onChange={handleChange} value={loginData.nombre}/>
                <span class="highlight-span"></span>
                <label class="lebal-email">Nombre</label>
            </div>
        </div>
        <div class="container-2">
            <div class="group">
                <input class="main-input" type="text" name='apellido' required onChange={handleChange} value={loginData.apellido}/>
                <span class="highlight-span"></span>
                <label class="lebal-email">Apellido</label>
            </div>
        </div>
        <button type="submit" className='register-btn' >REGISTRARSE</button>
                    <NavLink to='/login'><button type="" className='red-login-btn' >¿YA TENES CUENTA?</button></NavLink>
        </form>
            </div>
        </div>
        
    )
}
