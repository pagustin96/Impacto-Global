import React, {useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import axios from 'axios'
import '../styles/forgetPassword.css'

export const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [emailData, setEmailData] = useState({
        email: ''    
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmailData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        })
        );
    }
   
    const handleSendEmail = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            
            const response = await axios.post('http://localhost:8081/olvidoPwd',
            emailData , { withCredentials: true }
            )
            console.log(response)
            console.log(emailData)
            //const pwdNotEqual = document.getElementById('email-container')

            ////const pwdNotEqualDiv = document.createElement('div')  
            //pwdNotEqualDiv.textContent = response.data.message === 'no existe ese usuario con ese mail' ? 'USUARIO INEXISTENTE' :
           // 'MAIL ENVIADO CORRECTAMENTE'
            //pwdNotEqualDiv.style.color = 'red'

           //// pwdNotEqual.appendChild(pwdNotEqualDiv);
            setLoading(false)
            setTimeout(()=>{
               // pwdNotEqual.removeChild(pwdNotEqualDiv)
            }, 3000)


        } catch (error) {
            console.log('Respusta del servidor: ', error)
            setLoading(false)
        }
        
    }

return (
    <div className='container-register'>
    {loading && <div className='overlay-loader'><FadeLoader color="red" size={40}/></div>} 
        
    <NavLink to="/"> <img className='img-ar' src='/img/img_logos_arcons/ar-it-service-logo-01.png' alt='logoarcons'/> </NavLink>
        <p className='texto4'>Recuperar contraseña</p>
        <div>
            <form class="form" action="submit" onSubmit={handleSendEmail}>
                <div className='group'>
                    <input class="fourth-input"                      
                        type="email"
                        id="email"
                        name="email"
                        value={emailData.email}
                        onChange={handleChange}
                        required />
                        <span class="highlight-span"></span>
                        <label class="lebal-email4">Email</label>
                </div>
            
                <button type="submit" className='login-btn' >ENVIAR MAIL</button>
            
            </form>
        </div>
    </div>
)
}
