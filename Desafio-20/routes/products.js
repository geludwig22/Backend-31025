const { mongoProductsController } = require('../controllers');
const router = require('express').Router();

router.get('/', mongoProductsController.get); // read
router.get('/:id', mongoProductsController.getById); // read by id
router.post('/', mongoProductsController.post); // create
router.put('/:id', mongoProductsController.put); // update
router.delete('/:id', mongoProductsController.delete); // delete

module.exports = router;
