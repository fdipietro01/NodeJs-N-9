const { Router } = require("express");
const usersController = require("../controller/usersController");
const passportAutenticate = require("../middlewares/passportAutenticate");
const autorization = require("../middlewares/passportAuthorize");

const routerUsuarios = Router();

routerUsuarios.get(
  "/",
  passportAutenticate("current"),
  autorization("admin"),
  usersController.getUsers
);

module.exports = routerUsuarios;
