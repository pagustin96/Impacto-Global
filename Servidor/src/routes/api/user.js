const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { User } = require('../../config')
const {check, validationResult} = require('express-validator')
const moment = require('moment')
const jwt = require('jwt-simple')

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail() ,
    check('contraseña', 'La contraseña es obligatoris').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errores: errors.array()})
    }

    req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10)
    const user = await User.create(req.body)
    res.json(user)
})

router.get('/', async(req, res) => {
    const user = await User.findAll()
    res.json(user)
})

router.post('/login', async(req, res) => {
    const user = await User.findOne( { where: {email: req.body.email}})
    if(user){
        const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña)
        if(iguales){
            res.json({success: createToken(user)})
        } else {
            res.json({ error: 'Error em usuario y/o contraseña'})
        }
    } else {
        res.json({error: 'Error en usuario y/o contraseña'})
    }
})

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta')
}

module.exports = router