const router = require('express').Router()
const { Vacante } = require('../../config')
const {check} = require('express-validator')
const addVacanteController = require('../../controllers/AddVacanteController')

router.get('/', async (req, res) => {
    const vacante = await Vacante.findAll()
    res.json(vacante)
})

router.post('/add', [
    check('empresa', 'La empresa es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('seniority', 'El seniority es obligatorio').not().isEmpty(),
    check('skills', 'Los skills son obligatorios').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('ingles', 'El ingles es obligatorio').not().isEmpty(),
    check('rate', 'El rate es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('cierre', 'El cierre es obligatorio').not().isEmpty()
], addVacanteController.handleNewVacante)

router.put('/:id', async (req, res) => {
    await Vacante.update(req.body, {
        where: { id: req.params.id}
    })
    res.json({success: 'Se ha modificado'})
})

module.exports = router;
