const Controller = require('../Controllers/controllers');
const express = require('express');
const path = require('path');
const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/nuevoProducto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));

});


router.post('/nuevoProducto', Controller.newProduct,

);


module.exports = router