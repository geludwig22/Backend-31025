const path = require('path')
const fs = require('fs').promises

class Games {
  constructor() {
    this.path = path.join(__dirname, '../database/games.json')
  }

  async getGameById(id) {
    const data = await this.readData()
    const game = data.find(game => game,e.id == id)
    if (!game) {
      throw new Error('Game not found')
    }
    return game
  }

  async add(game) {
    const response = {
      data:[],
      error: 'No se pudo guardar el producto'
  }
    const data = await this.readData()
    const id = data[data.length - 1] ? data[data.length - 1].id : 0
    game.id = id + 1
    data.push(game)
    await this.writeData(data)
    try{
      response.data = data;
    } catch (error){
      response.error = error;
    }

  }

  async getAll() {
    return this.readData()
  }

  writeData(data) {
    return fs.writeFile(this.path, JSON.stringify(data, null, 2))
  }

  async readData () {
    const raw = await fs.readFile(this.path, "utf8")
    return JSON.parse(raw)
  }
}

module.exports = Games