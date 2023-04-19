const { Router } = require("express");
const cartController = require("../controller/cartController");
const passportAutenticate = require("../middlewares/passportAutenticate");

const carritoRouter = Router();

carritoRouter.post(
  "/",
  passportAutenticate("current"),
  cartController.crearCarrito
);

carritoRouter.get(
  "/:cid",
  passportAutenticate("current"),
  cartController.getProductsFromCart
);

module.exports = carritoRouter;
