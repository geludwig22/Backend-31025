import express from 'express'

const app = express()
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>console.log(`Listen on ${PORT} port`))

app.get('/',(req,res)=>{
    let info = {
        message:'Vive!',
        port:`Listen on ${PORT} port`
    }
    res.status(200).send(info)
})