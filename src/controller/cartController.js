const CartManager = require("../daos/mongoDaos/CartManager");
const ProductManager = require("../daos/mongoDaos/ProductManager");

class CartController {
  async getProductsFromCart(req, res) {
    const { cid } = req.params;
    try {
      const cartProducts = await CartManager.getProductsfromCart(cid);
      const { payload: catalogProducts } = await ProductManager.getProducts();
      const cartExist = cartProducts.length;
      const catalogExists = catalogProducts.length;
      res.render("editCarritos", {
        cartProducts,
        catalogProducts,
        cartExist,
        catalogExists,
        id: cid,
      });
    } catch (err) {
      res.send({ error: err.message });
    }
  }
  async crearCarrito(req, res) {
    const cart = await CartManager.addCart();
    res.send({ id: cart._id });
  }
}

module.exports = new CartController();
