const cartsModel = require('../../models/mongo/carts');

module.exports = {
  get: async (req, res) => {
    try {
      const carts = await cartsModel.getAll();
      res.send(carts);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  post: async (req, res) => {
    try {
      const carts = await cartsModel.createCart();
      res.status(201).send(carts);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await cartsModel.getById(id);
      res.send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  getProducts: async (req, res) => {
    const { id } = req.params;
    try {
      const products = await cartsModel.getProducts(id);
      res.send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await cartsModel.delete(id);
      res.status(200).send({
        message: 'Carrito Eliminado',
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  addProduct: async (req, res) => {
    const { id, id_prod } = req.params;
    try {
      const newProd = await cartsModel.addProductOnCart(id, id_prod);
      res.status(200).send(newProd);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  deleteAll: async (req, res) => {
    try {
      await cartsModel.deleteAllCarts();
      res.status(200).send({
        message: 'Todos los carritos eliminados',
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  deleteProductOnCart: async (req, res) => {
    const { id, id_prod } = req.params;
    try {
      const newProd = await cartsModel.deleteProductOnCart(id, id_prod);
      res.status(200).send(newProd);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },

  /* ,

  put: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const product = await cartsModel.update(id, body);
      res.status(200).send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },

   */
};
