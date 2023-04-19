const { Router } = require("express");
const passportAutenticate = require("../middlewares/passportAutenticate");

const sessionController = require("../controller/sessionController");

const sessionsRouter = Router();

sessionsRouter.post("/login", sessionController.login);

sessionsRouter.post("/register", sessionController.register);

sessionsRouter.post("/relogin", sessionController.relogin);

sessionsRouter.get("/logout", sessionController.logout);

sessionsRouter.get(
  "/current",
  passportAutenticate("current"),
  sessionController.current
);

module.exports = sessionsRouter;
