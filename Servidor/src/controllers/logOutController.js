
const handleLogOut = (req, res) =>{
    // Eliminar la cookie del token (si existe)
    try {
        console.log(req.signedCookies.access_token)
        res.cookie('access_token', null , {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now())
    })
    
    // Enviar una respuesta exitosa
    res.status(201).json({ message: 'Sesión cerrada exitosamente' });   
    } catch (error){
        res.sendStatus(401)
        console.log({'error ': error})
    }

}

module.exports = { handleLogOut }
