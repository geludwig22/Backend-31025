const { Router } = require('express');
const productModel = require('../models/product.model');

const router = new Router();

router.get('/', async (req, res) => res.send(await productModel.getAll()));
router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404);
  }

  res.send(await productModel.getById(req.params.id));
});
router.post('/', async (req, res) => {
  const { body } = req;
  try {
    await productModel.save(body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const { body } = req;
  try {
    await productModel.update(req.params.id, body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await productModel.delete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
