const router = require('express').Router()
  
const apiUserRouter = require('./api/user')
const apiCandidatosRouter = require('./api/candidatos')

router.use('/user', apiUserRouter)
router.use('/candidatos', apiCandidatosRouter)

module.exports = router