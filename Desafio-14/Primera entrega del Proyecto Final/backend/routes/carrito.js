
const Controller = require('../Controllers/controllerCarrito');
const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');
const path = require('path');
const { Router } = express;

const router = Router();


router.post('/', cors(), auth(true,'carrito'), Controller.createCart);
router.delete('/:id',cors(), auth(true,'carrito'), Controller.deleteCart);
router.delete('/:id/productos/:id_prod',cors(), auth(true,'carrito'), Controller.deleteProductOnCart);
router.post('/:id/productos',cors(), auth(true,'carrito'), Controller.addProductOnCart);
router.get('/:id/productos',cors(), auth(true,'carrito'), Controller.getCartProducts);


module.exports = router