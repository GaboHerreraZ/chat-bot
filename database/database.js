const mongoose = require("mongoose");

class Database {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.isConnected = false;
  }

  async connect() {
    if (!this.isConnected) {
      try {
        await mongoose.connect(this.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: this.dbName,
        });
        this.isConnected = true;
        console.log("Conexión exitosa a MongoDB");
      } catch (error) {
        console.error("Erro al conectar a MongoDB", error);
      }
    }
  }

  disconnect() {
    if (this.isConnected) {
      mongoose.disconnect();
      this.isConnected = false;
      console.log("Conexión cerrada a MongoDB");
    }
  }

  async startSession() {
    return await mongoose.startSession();
  }
}

module.exports = Database;
