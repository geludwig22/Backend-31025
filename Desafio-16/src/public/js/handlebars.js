

const socket = io();
console.log(socket,'conexion handlebar');
const form = document.getElementById('addGame');
const formAddGame = document.getElementById('addGame');
formAddGame.addEventListener('submit', async e => {
    e.preventDefault()
    const game = {
        name: formAddGame[0].value,
        price: formAddGame[1].value,
        image: formAddGame[2].value
    }
    await socket.emit('newGame', game);
    formAddGame.reset()
})


socket.on('allgames', (games) => {
let containerTable = document.getElementById('products-container');

let html;
  fetch('partials/table.hbs')
  .then(respuesta => respuesta.text())
  .then(hbs => {
      const template = Handlebars.compile(hbs);
      html = template({ games })
      containerTable.innerHTML = html
  })

});

 