const path = require('path')
const { Router } = require ('express')
const Games = require('../models/Games')

const router =  Router()
const gameModel = new Games()

// Ruta para listar productos
router.get('/',async (req,res)=>{
    const games = await gameModel.getAll()
    //Mostrar productos nombre de plantilla y el objt del contexto
    res.render('home', {games})
})


module.exports = router