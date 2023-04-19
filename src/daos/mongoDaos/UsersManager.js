const userModel = require("../../models/userSchema");

class UserManager {
  async getAllUsers() {
    try {
      //const { page = 1 } = req.query;
      //const usuarios = await userModel.paginate({}, { limit: 1, page, lean: true }); // variante con paginado
      const usuarios = await userModel.find({}).lean();
      return usuarios;
    } catch (err) {
      throw new Error("Error buscar usuarios", err);
    }
  }
  async getSingleUser(email) {
    try {
      const usuario = await userModel.findOne({ email }).lean();
      return usuario;
    } catch (err) {
      throw new Error("Error al buscar usuario", err);
    }
  }
  async createUser(user) {
    try {
      userModel.create(user);
    } catch (err) {
      throw new Error("Error al buscar usuario", err);
    }
  }
  async updateUser(email, password) {
    await userModel.findOneAndUpdate({ email }, { password });
  }
}

module.exports = new UserManager();
