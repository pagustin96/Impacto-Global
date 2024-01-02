import React, { useState } from 'react'

export const NuevoIdioma = () => {
    const initialIdiomaState = {
        dni: '',
        idPais: '',
        idioma: '',
        nivel: ''
      }


    const [idioma, setIdioma] = useState(initialIdiomaState)
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        console.log(idioma)
        setIdioma((prevIdioma) => ({
            ...prevIdioma,
            [name]: value,
        })
        );
    }
  return (
    <div>
        <input type="text" name='idioma' placeholder='Idioma...' onChange={handleChange}/>
        <input type="text" name='nivel' placeholder='Nivel...' onChange={handleChange}/>
    </div>
  )
}
