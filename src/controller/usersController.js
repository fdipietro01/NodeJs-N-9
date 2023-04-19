const UserManager = require("../daos/mongoDaos/UsersManager");

class UsuarioController {
  async getUsers(req, res) {
    const usuarios = await UserManager.getAllUsers();
    const dataExist = usuarios.length;
    res.render("usuariosList", {
      dataExist,
      usuarios,
    });
  }
  catch(err) {
    res.send({ error: err.message });
  }
}

module.exports = new UsuarioController();
