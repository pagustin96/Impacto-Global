import React, {useState, useEffect} from 'react'
import '../styles/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
    const [verif, setVerif] = useState(false) 
    const [data, setData] = useState('')
    const [loginData, setLoginData] = useState({
            email: '',
            contraseña: ''
        })

    const navigate = useNavigate();

    useEffect(() => {
        if(verif){
            navigate('/home')
        }
    },[verif])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        })
        );
    }

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(`http://localhost:8080/api/user/login`,
                loginData, {withCredentials: true}
            );
            console.log(response)
            if(response.data.message === 'Inicio de sesion exitoso' && response.status === 200){
                console.log('Usuario encontrado', 'Validacion Ok!');
                setVerif(true);
            }
           
        } catch (error){
            console.error('Error al obtener los datos:', error);
        }
    }

  return (
    <div className='container-login'>
        <img className='img-ar' src='/img/img_logos_arcons/1.png' alt='logoarcons'/>
        <div className='form-container-login'>
            <form action="submit" onSubmit={handleLogin}>
                <div className='iniSes-container'>Iniciar sesion</div>
                <div className='email-container'>
                    <label htmlFor="email">Email</label>
                    <input                       
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required 
                        placeholder='Ingresa tu mail...' />
                </div>
                <div className='password-container'>
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                     type='password' 
                     id='contraseña' 
                     name='contraseña'
                     value={loginData.contraseña}
                     onChange={handleChange} 
                     required
                     placeholder='Ingresa tu contraseña'/>
                </div>
                <button type="submit" className='login-btn' >INICIAR SESION</button>
                <NavLink><button type="" className='forgetpsw-btn' >OLVIDASTE TU CONTRASEÑA</button></NavLink>
            </form>
        </div>
    </div>
  )
}
