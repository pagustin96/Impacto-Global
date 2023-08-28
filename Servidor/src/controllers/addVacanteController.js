const { Vacante } = require ('../config')
const {validationResult} = require('express-validator')

const handleNewVacante = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(422).json({errores: errors.array()})
        return
    }

    const {empresa, nombre, seniority, skills, cantidad, comienzo, ingles, rate, estado, cierre } = req.body
        if(!empresa ||  !nombre || !seniority || !skills || !cantidad ||
            !comienzo || !ingles || !rate || !estado || !cierre){
                return res.status(400).json({ 'message': 'All data are required'})
        } 

    try{
        
        const vacante = await Vacante.create(req.body)
        res.json(vacante)
    } catch (err) {
        res.status(500).json({ 'message': err.message})
    }
}


module.exports = {handleNewVacante}