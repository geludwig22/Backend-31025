const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 8080;

//Routes
const routeProducts = require('./routes/productos');
const routeCart= require('./routes/carrito');

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Middlewarer de error 
app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});


app.use('/api/productos', routeProducts);
app.use('/api/carrito', routeCart);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))