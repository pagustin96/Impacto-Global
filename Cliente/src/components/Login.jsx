import React, {useState, useEffect } from 'react'
import '../styles/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FadeLoader } from 'react-spinners';

export const Login = ({ setUser }) => {
    const [loading, setLoading] = useState(false)
    const [verif, setVerif] = useState(false) 
    const [data, setData] = useState('')
    const [loginData, setLoginData] = useState({
            email: '',
            pwd: ''
        })

    const navigate = useNavigate();

    useEffect(() => {
        
        if(verif){
        
        setTimeout(() => {
            //setUser(true)
        sessionStorage.setItem('user', true)
        
            setLoading(false)
            navigate('/home')
        }, 1000)
            
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
        setLoading(true)
        try{
            const response = await axios.post(`http://localhost:8081/login`,
                loginData, {withCredentials: true}
                
            );
            console.log(response)
            sessionStorage.setItem('userData', loginData.email)
            sessionStorage.setItem('id_user' , response.data.id_user)
            if(response.status === 200){
                console.log('Usuario encontrado', 'Validacion Ok!', response);
                setVerif(true);
            }
        
        } catch (error){
            console.error('Error al obtener los datos:', error);
            setLoading(false)
            alert('Usuario o contraseña incorrecta!')
        }
    }

    return (
        <div className='container-login'>
        {loading && <div className='overlay-loader'><FadeLoader color="red" size={40}/></div>} 
            
        <NavLink to="/"> <img className='imglogin' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/> </NavLink>
            <div className='form-container-login'>
                <form class="form" action="submit" onSubmit={handleLogin}>
                    <div className='texto2'>Iniciar sesion</div>
                    <div className='group2'>
                        <input class="second-input"
                            type="email"
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required  />
                            <span class="highlight-span"></span>
                            <label class="lebal-email2" htmlFor="Email">Email</label>
                    </div>
                    <div className='group2'>
                    
                        <input class="second-input"
                        type='password' 
                        id='pwd' 
                        name='pwd'
                        value={loginData.pwd}
                        onChange={handleChange} 
                        required />
                        <span class="highlight-span"></span>
                        <label class="lebal-email2" htmlFor="Email">Contraseña</label>
                    </div>
                    <button type="submit" className='login-btn' >INICIAR SESION</button>
                    <NavLink to='/forget-password'><button type="" className='forgetpsw-btn' >OLVIDASTE TU CONTRASEÑA</button></NavLink>
                </form>
            </div>
        </div>
    )
}
