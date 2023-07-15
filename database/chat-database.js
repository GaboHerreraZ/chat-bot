const Database = require("./database");

require("dotenv").config();

class ChatDatabase {
  constructor() {
    this.url = process.env.MONGODB_CONECCTION;
    this.dbName = process.env.DB_NAME;
    this.db = new Database(this.url, this.dbName);
  }

  async connectToChatDatabase() {
    await this.db.connect();
  }

  async runInTransaction(fn) {
    const session = await this.db.startSession();
    session.startTransaction();

    try {
      await fn(session);
      await session.commitTransaction();
    } catch (error) {
      console.error("Error al ejecutar la transaccion", error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  async closeDB() {
    this.db.disconnect();
  }
}

module.exports = ChatDatabase;
