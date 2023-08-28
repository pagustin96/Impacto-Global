const router = require('express').Router()

const middleware = require('./middlewares')
const apiUserRouter = require('./api/user')
const apiCandidatosRouter = require('./api/candidatos')
const apiVacantesRouter = require('./api/vacantes')

router.use('/user', apiUserRouter)
router.use('/candidatos', middleware.checkToken, apiCandidatosRouter)
router.use('/vacantes', middleware.checkToken, apiVacantesRouter)

module.exports = router