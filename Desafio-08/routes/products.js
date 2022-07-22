const Controller = require('../Controllers/controllers');
const express = require('express');
const path = require('path');
const { Router } = express;


/* const upload = require('./middleware/multer'); */



const router = Router();

router.get('/', Controller.getAllProducts);

router.get('/:id', Controller.getProductById);

router.post('/', Controller.newProduct);

router.put('/:id', Controller.updateProductById);

router.delete('/:id', Controller.deleteProduct);

module.exports = router;