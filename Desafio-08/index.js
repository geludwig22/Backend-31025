const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;



const routeProducts = require('./routes/products');
const formProducts = require('./routes/newProducts');


//Midleware incorporados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use("/static",express.static("public")); */
app.use("/static",express.static(path.join(__dirname, 'public')));

app.use('/api/productos', routeProducts);
app.use('/', formProducts);


const server= app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

server.on("error",(err)=>{
    console.log(`Error: ${err.message}`);
});