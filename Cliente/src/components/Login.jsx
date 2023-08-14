import React, {useState, useEffect, createContext} from 'react'
import '../styles/login.css'
import { NavLink, useNavigate } from 'react-router-dom'

export const Login = () => {
    const [verif, setVerif] = useState(false) 
    const [data, setData] = useState('')
    const [loginData, setLoginData] = useState({
            email: '',
            password: ''
        })
    
    const UserContext = createContext();
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
            const response = await fetch(`http://localhost:8081/usuario/verify-email/${loginData.email}`);
            const responseData = await response.json();
            setData(responseData);
            if (loginData.email === responseData.email && loginData.password === responseData.contraseña) {
                console.log('Usuario encontrado');
                setVerif(true);
            } else {
                console.log('Usuario no encontrado');
                setVerif(false);
            }
        } catch (error){
            console.error('Error al obtener los datos:', error);
        }
       /* fetch(`http://localhost:8081/usuario/verify-email/${loginData.email}`)
        .then((response) => response.json())
        .then(response => setData(response))
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        })
        if(loginData.email === data.email && loginData.password === data.contraseña){
            console.log('encontrado')
            setVerif(true)          
        } else {
        alert('Usuario no encontrado')
        setVerif(false)        
        }
        //verifyUser()*/
    }

    const verifyUser = () => {
        if(loginData.email === data.email && loginData.password === data.contraseña){
            console.log('encontrado')
            setVerif(true)          
        } else {
        alert('Usuario no encontrado')
        setVerif(false)        
        }
    }


  return (
    <div className='container-login'>
        <img className='img-ar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/>
        <div className='form-container'>
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
                    <label htmlFor="password">Contraseña</label>
                    <input
                     type='password' 
                     id='password' 
                     name='password'
                     value={loginData.password}
                     onChange={handleChange} 
                     required
                     placeholder='Ingresa tu contraseña'/>
                </div>
                <button type="submit" className='iniSes-btn' >INICIAR SESION</button>
                <NavLink><button type="" className='forgetpsw-btn' >OLVIDASTE TU CONTRASEÑA</button></NavLink>
            </form>
        </div>
    </div>
  )
}
