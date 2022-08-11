
const Controller = require('../Controllers/controllerProducts');
const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');
const path = require('path');
const { METHODS } = require('http');
const { Router } = express;

const router = Router();



router.get('/', cors(), auth(true, 'productos'), Controller.getAllProducts);
router.get('/:id',cors(),auth(true, 'productos'), Controller.getProductById);
router.post('/', cors(), auth(false, 'productos'),Controller.newProduct);
router.put('/:id',cors(), auth(false, 'productos') ,Controller.updateProductById);
router.delete('/:id', cors(), auth(false, 'productos'), Controller.deleteProduct);


module.exports = router