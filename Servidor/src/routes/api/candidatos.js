const router = require('express').Router()
const { Candidato } = require('../../config')

router.get('/', async (req, res) => {
    const candidato = await Candidato.findAll()
    res.json(candidato)
})

router.post('/', async (req, res) => {
    const candidato = await Candidato.create(req.body)
    res.json(candidato)
})

router.put('/:id', async (req, res) => {
    await Candidato.update(req.body, {
        where: { id: req.params.id}
    })
    res.json({success: 'Se ha modificado'})
})

module.exports = router;