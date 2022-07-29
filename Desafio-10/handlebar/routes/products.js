const { Router } = require ('express')
const router =  Router()
const Games = require('../models/Games')
const gameModel = new Games()



router.post('/productos',async (req, res)=>{
    await gameModel.add(req.body)
    res.redirect('/')
})


module.exports = router