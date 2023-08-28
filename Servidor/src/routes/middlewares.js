const jwt = require('jsonwebtoken')
const moment = require('moment')

const checkToken = (req, res, next) => {
    // Verifico que exista el token en las cookies
    if(!req.cookies.access_token){// Si no existe hago un return con error 
        return res.json({ error: 'Necesitas incluir el access_token en la cookie'})
    }
    //Si existe la cookie la almaceno en la variable userToken
    const userToken = req.cookies.access_token
    let payload = {}
    try{ // decodifico userToken y lo almaceno en el objeto payload
        payload = jwt.decode(userToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(payload)
        
    } catch (err) {
        return res.status(401).json({ error: 'El token es incorrecto'})
    }
    //Verifico que el token no alla expirado
    //if(payload.expiredAt < moment().unix()){ // Si expiro devuelvo error
      //  return res.json({ error: 'el token ha expirado'})
    //}
  next()
   // req.usuarioId = payload.usuarioId
}

module.exports = {
    checkToken: checkToken
}