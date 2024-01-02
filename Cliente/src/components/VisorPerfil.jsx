import React from 'react'

export const VisorPerfil = ({setVisorVisible, visorVisible}) => {
    const ocultarVisor = () => {
        setVisorVisible(false);
      }
      
 

  return (
    <>
      {visorVisible && (
        <div className='overlay' onClick={ocultarVisor}>
          <div className='visor-prefil-container zoom-in'>
            <div className='visor-circulo-perfil-perfil'>
              <img
                
                src={`/img/img_perfil/perfil.webp`}
                alt='perfil_img'
                className='visor-circulo-perfil-perfil'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
