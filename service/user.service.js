const UserModel = require("../model/user.model");

class UserService {
  async insertUser(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      console.log("Usuario guardado correctamente");
    } catch (error) {
      console.error("Error al insertar usuario");
    }
  }

  async findUser(query) {
    try {
      const users = await UserModel.find(query);
      console.log("Usuarios encontrados", users);
    } catch (error) {
      console.error("Error consultando usuarios", error);
    }
  }
}

module.exports = UserService;
