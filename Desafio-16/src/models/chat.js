const knex = require("knex");
const fs = require("fs").promises;
const path = require("path");


class Chat {
  constructor() {
    this.db = knex({
      client: "sqlite3",
      connection: {
        filename: path.join(__dirname, "../database/ecommerce/chat.sqlite"),
      },
      useNullAsDefault:true
    });
  }
  async loadData() {
    try {
      await this.db.schema.dropTableIfExists("chats");
      await this.db.schema.createTable("chats", (table) => {
        table.increments("id")
        table.string("email")
        table.string("date")
        table.string("de")
        table.string("mensaje")
      })

      const raw = await fs.readFile(path.join(__dirname, '../database/msgChat.json'), "utf-8");
      const chats = JSON.parse(raw);
      
      for (const chat of chats) {
        const tableChats = this.db('chats');
        //  Insertar datos en la tabla chats
        await tableChats.insert(chat)
      }
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getAll() {
    const chats = await this.db.select().from("chats");
    return chats;
  }
  async getById(id) {
    const chat = await this.db("chats").where({ id }).first();
    return chat;
  }
  
  async add(chat) {
    const result = await this.db("chats").insert(chat);
    return result[0];
  }
  async deleteById(id) {
    await this.db("chats").where({ id }).del();

  }
}

module.exports = new Chat();
