const bcrypt = require('bcryptjs')
const { User } = require ('../config')
const moment = require('moment')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {
    //Verifico que me pasen user y password
    const { email, contraseña } = req.body
    if(!email || !contraseña) return res.status(400).json({ 'message': 'Username a password are required'})

    //Busco el usuario en la base de datos
    const foundUser = await User.findOne( { where: {email: req.body.email}})
    if(!foundUser) {
        return res.sendStatus(401) //Si no lo encuentro devuelvo error 401 - Unauthorized
    }
        //Evaluate password
        const match = await bcrypt.compare(contraseña, foundUser.contraseña)
        if(match){

            //Create JWT
            const access_token = createToken(foundUser) // llamo a la funcion y le paso la instancia del usuario encontrado
            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 1000 * 15 // milisegundos de duracion de la cookie en el navegador
            })
            res.json({ message: 'Inicio de sesion exitoso', access_token})
        } else {
            res.sendStatus(401)
        }
}

//Funcion para crear el Token 
const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        //expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.ACCES_TOKEN_SECRET)
}

module.exports = { handleLogin }
