const fs = require("fs").promises;
const Contenedor = require("./class");

const nuevoProducto = new Contenedor("./productos.txt");

nuevoProducto.save({
  title: "Cacao",
  price: 1640,
  thumbnail: "http://www.jdjdjd.com",
});

nuevoProducto.getAll();

setTimeout(() => {
  nuevoProducto.getById(4);
}, 5000);

setTimeout(() => {
  nuevoProducto.deleteById(6);
}, 7000);

setTimeout(() => {
  nuevoProducto.deleteAll();
}, 9000);
