const knex = require("knex");
const fs = require("fs/promises")
const path = require("path")


class Game {
  constructor() {
    this.db = knex({
      client: "mysql",
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "games_db",
      },
    });
  }
  async loadData() {
    try {
      await this.db.schema.dropTableIfExists("games");
      await this.db.schema.createTable("games", (table) => {
        table.increments("id")
        table.string("name")
        table.integer("price")
        table.string("image")
      })

      const raw = await fs.readFile(path.join(__dirname, "../database/games.json"), "utf-8");
      const games = JSON.parse(raw);
      
      for (const game of games) {
        console.log(game)
        await this.db("games").insert(game)
      }
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getAll(name='') {
   const games = await this.db("games").whereILike("name", `%${name}%`).orderBy("name")
   return games;
  }
  async getById(id) {
    const game = await this.db("games").where({ id }).first();
    return game;
  }
  async update(id, game) {
    await this.db("games").where({id}).update(game)
  }
  async add(game) {
    const result = await this.db("games").insert(game);
    return result[0];
  }
  async delete(id) {
    await this.db("games").where({ id }).del();
    
  }
}

module.exports = new Game();
