const mongoProductsController = require('../controllers/mongo/controller.products');
const mongoCartsController = require('../controllers/mongo/controller.carts');
const firestoreProductsController = require('./firestore/controller.products');
module.exports = {
  mongoCartsController,
  mongoProductsController,
  firestoreProductsController,
};
