const { User } = require ('../config')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

const handleNewUser =async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).json({errores: errors.array()})
            return
        }
        
        const { email, contraseña } = req.body
        if(!email || !contraseña) return res.status(400).json({ 'message': 'Username a password are required'})
    
        const duplicate = await User.findOne( { where: {email: req.body.email}})
        if(duplicate) {
            console.log('Ya existe el mail')
            return res.sendStatus(409)
        }
        try{
            req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10)
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            res.status(500).json({ 'message': err.message})
        }
    }


module.exports = {handleNewUser}