const socket = io();
const formAddGame = document.getElementById('addGame');
const containerTable = document.getElementById('products-container');

socket.on('allgames', (games) => {
    
    let html;
      fetch('partials/table.hbs')
      .then(respuesta => respuesta.text())
      .then(hbs => {
          const template = Handlebars.compile(hbs);
          html = template({ games })
          containerTable.innerHTML = html
      })
    
});


formAddGame.addEventListener('submit', e => {
    e.preventDefault()
    const game = {
        name: formAddGame[0].value,
        price: formAddGame[1].value,
        image: formAddGame[2].value
    }
    socket.emit('newGame', game);
    formAddGame.reset()
})

//-------- Chat -------------------// 

const inputMessage = document.getElementById('message')
const inputEmail = document.getElementById('email')
const btnSend = document.getElementById('btnSend')

const formSendMsg = document.getElementById('formSendMsg')
formSendMsg.addEventListener('submit', e => {
    e.preventDefault()

    const msg = { 
        de: inputEmail.value, 
        mensaje: inputMessage.value 
    }
    socket.emit('newMsg', msg);
    formSendMsg.reset()
    inputMessage.focus()
})

function toHtml(arr) {
    return arr.map(msg => {
        return (`
            <div>
                <b style="color:blue;">${msg.de}</b>
                [<span style="color:brown;">${msg.date}</span>] :
                <i style="color:green;">${msg.mensaje}</i>
            </div>
        `)
    }).join(" ");
}
socket.on('msgAll', (msgs) => {
    const html = toHtml(msgs);
    document.getElementById('chat-container').innerHTML = html;
})

inputEmail.addEventListener('input', () => {
    const email = inputEmail.value.length
    const msg = inputMessage.value.length
    inputMessage.disabled = !email
    btnSend.disabled = !email || !msg
})

inputMessage.addEventListener('input', () => {
    const msg = inputMessage.value.length
    btnSend.disabled = !msg
})
