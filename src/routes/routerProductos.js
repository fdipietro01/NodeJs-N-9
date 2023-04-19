const { Router } = require("express");
const passportAuthorize = require("../middlewares/passportAuthorize");
const passportAutenticate = require("../middlewares/passportAutenticate");
const productController = require("../controller/productController");

const routerProductos = Router();

routerProductos.get("/", productController.getProducts);

routerProductos.post("/", productController.addProduct);

routerProductos.put(
  "/:pid",
  passportAutenticate("current"),
  passportAuthorize("admin"),
  productController.editProduct
);

routerProductos.delete(
  "/:pid",
  passportAutenticate("current"),
  passportAuthorize("admin"),
  productController.deleteProduct
);

module.exports = routerProductos;
