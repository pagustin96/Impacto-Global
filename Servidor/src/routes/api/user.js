const router = require('express').Router()
const { User } = require('../../config')
const {check} = require('express-validator')
const registerController = require('../../controllers/registerController')
const authController = require('../../controllers/authController')
const logOutController = require('../../controllers/logOutController')

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail() ,
    check('contraseña', 'La contraseña es obligatoris').not().isEmpty()
], registerController.handleNewUser)

router.get('/', async(req, res) => {
    const user = await User.findAll()
    res.json(user)
})

router.post('/login', authController.handleLogin)

router.get('/logOut', logOutController.handleLogOut)

module.exports = router