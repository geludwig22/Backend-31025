const { firestoreProductsController } = require('../../controllers');
const router = require('express').Router();

router.get('/', firestoreProductsController.get);
router.get('/:id', firestoreProductsController.getById);
router.post('/', firestoreProductsController.post);
router.delete('/:id', firestoreProductsController.deleteById);
router.put('/:id', firestoreProductsController.update);

module.exports = router;
