const app = require('express')()

const primesRouter = require('./routes/prime')
const fileRouter = require('./routes/file')

app.get("/", (req, res) => res.send("OK"))

app.use('/prime', primesRouter)
app.use('/file', fileRouter)

module.exports = app

