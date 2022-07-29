const express = require("express");
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const Games = require('./models/model');
const product = new Games();

app.engine("hbs",
    engine({
        layoutsDir: path.join(__dirname, "views/layouts"),
        defaultLayout: "index",
        extname:"hbs",
    })
)

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/static", express.static(path.join(__dirname,"public")));
app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,"public/form.html"));
})

app.get("/productos", async(req, res)=>{
    const games = await product.getAll();
    res.render("main", { games })
})
app.post('/productos',async (req, res)=>{
    await product.add(req.body)
    res.redirect('/')
})


const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`); 
});

server.on ("Error", (err)=> console.log(err))