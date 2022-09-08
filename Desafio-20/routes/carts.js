const { mongoCartsController } = require('../controllers');
const router = require('express').Router();

router.get('/', mongoCartsController.get); // Get all carts
router.post('/', mongoCartsController.post); // Create a new cart
router.get('/:id', mongoCartsController.getById); // Get a cart by id
router.get('/:id/products', mongoCartsController.getProducts); // Get all products from a cart
router.delete('/:id/products/:id_prod', mongoCartsController.deleteProductOnCart); // Delete a product from a cart
router.delete('/:id', mongoCartsController.delete); // Delete a cart by id
router.delete('/', mongoCartsController.deleteAll); // Delete all carts
router.post('/:id/products/:id_prod', mongoCartsController.addProduct); // Add a product to a cart

module.exports = router;
