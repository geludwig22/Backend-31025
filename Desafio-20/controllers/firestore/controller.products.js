const modelProducts = require('../../models/firestore/products');

module.exports = {
  get: async (req, res) => {
    try {
      const products = await modelProducts.getAll();
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    try {
      const body = req.body;
      const product = await modelProducts.create(body);
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await modelProducts.getById(id);
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await modelProducts.deleteById(id);
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await modelProducts.update(id, req.body);
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
