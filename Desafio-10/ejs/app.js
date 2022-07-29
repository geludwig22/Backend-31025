const express = require('express')
const path = require('path')
const app = express()

// importar instrucciones para pug engine
const pugEngine = require('./engine/ejs')


//importar router

const pugRouter = require('./routes/home')
const nuevoRouter = require('./routes/nuevo')
const PORT = process.env.PORT || 8080
pugEngine(app)

// middlewares para incluir los parametros en el req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// sirve archivos estaticos en /static
app.use("/static", express.static(path.join(__dirname, 'public')));

// ruta de hello
/* app.use("/", (req, res)=>{  
    res.send("HOLA PUTOS")
}) */
app.use("/productos", pugRouter)
app.use("/", nuevoRouter)


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))