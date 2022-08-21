/* (async () => { */
const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
const app = express()
const modelGames = require('./models/games');
const modelChat = require('./models/chat');

const { Server } = require("socket.io");
const server = http.createServer(app)
const io = new Server(server);

const PORT = process.env.PORT || 8081;

//Middlewares
/* app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
 */
app.use(express.static('public'))
//Routes
/* try{   
     await modelGames.loadData()
       await modelChat.loadData()
    //Socket
 }  catch(e){
     console.log(e)
 } */

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "public/index.html"))
);
//Socket
io.on('connection', async (socket) => {
    const games  = await modelGames.getAll()
    
    socket.emit('allgames',games)
    //Post 
    socket.on('newGame', async (game) => {
        await modelGames.add(game)
        socket.emit('allgames', await modelGames.getAll())
    })

    //Delete game
    socket.on('deleteGame', async (id) => {
        await modelGames.delete(id)
        socket.emit('allgames', await modelGames.getAll())
    })
    
    // Mensajes
    socket.emit('msgAll', await modelChat.getAll());

      // actualizacion de mensajes
    socket.on('newMsg', async mgs => {
        mgs.date = new Date().toLocaleString()
        await modelChat.add(mgs)
        socket.emit('msgAll', await modelChat.getAll());
    })
})

    server.listen(PORT, () => {
        console.log(`Escuchando http://localhost:${PORT}`);
    });
    server.on("Error", (err) => console.log(err));
/* })() */