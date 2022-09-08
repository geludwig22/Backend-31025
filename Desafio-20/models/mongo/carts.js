const e = require('express');
const mongoose = require('mongoose');
const productsModel = require('./products');
class Cart {
  constructor() {
    const schema = new mongoose.Schema({
      products: { type: Array, default: [] },
      timestamp: {
        type: Date,
        default: Date.now(this.timestamp).toString(),
        format: '%Y-%m-%d',
      },
    });

    // Model
    this.model = mongoose.model('carritos', schema);
  }

  async createCart() {
    //Add a new cart
    const cart = await this.model.create({});
    console.log('--------------------');
    console.log(JSON.stringify(cart, null, 2));
    return cart;
  }

  async getAll() {
    //Get all carts created
    const carts = await this.model.find();
    console.log(`Carts en DB: ${carts.length}`);

    // projections de mongo
    return await this.model.find(
      {},
      {
        products: 1,
        timestamp: 1,
      },
    );
  }

  async getById(id) {
    const cart = await this.model.findById(id);
    return cart;
  }

  async getProducts(id) {
    const cart = await this.getById(id);
    return cart.products;
  }

  async create(prod) {
    const product = await this.model.create(prod);
    console.log('----------PRODUCT CREATED----------');
    console.log(JSON.stringify(product, null, 2));

    return product;
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id);
    console.log('--------------------');
    console.log('Cart Deleted');
  }

  async update(id, body) {
    const product = await this.model.updateOne({ _id: id }, body);
    console.log('--------------------');
    console.log('Cart Updated');
    return product;
  }

  async AllProducts(id) {
    const cart = await this.getById(id);
    return cart.products;
  }

  async addProductOnCart(id, idProduct) {
    const cart = await this.getById(id);
    const product = await productsModel.getById(idProduct);
    const isInCart = await this.isProductInCart(id, idProduct);

    if (isInCart.length === 0) {
      const newProduct = {
        id: idProduct,
        quantity: 1,
        name: product.name,
        description: product.description,
        price: product.price,
        code: product.code,
        total: 0,
        timestamp: product.timestamp,
      };
      cart.products.push(newProduct);
      await this.update(id, cart);
      return cart;
    } else {
      return await this.updateProductOnCart(id, idProduct);
    }
  }

  async deleteProductOnCart(id, idProduct) {
    const cart = await this.getById(id);
    const isInCart = await this.isProductInCart(id, idProduct);
    const product = isInCart[0];
    const checkQuantity = await this.checkQuantityProduct(id, idProduct);
    if (checkQuantity > 1) {
      product.quantity = product.quantity - 1;
      product.total = product.quantity * product.price;
      cart.products = cart.products.filter((product) => product.id !== idProduct);
      cart.products.push(product);
      await this.update(id, cart);
      return cart;
    } else {
      cart.products = cart.products.filter((product) => product.id !== idProduct);
      await this.update(id, cart);
      return cart;
    }
  }

  async checkQuantityProduct(id, idProduct) {
    const cart = await this.getById(id);
    const isInCart = await this.isProductInCart(id, idProduct);
    const product = isInCart[0];
    return product.quantity;
  }
  async updateProductOnCart(id, idProduct) {
    const cart = await this.getById(id);
    const isInCart = await this.isProductInCart(id, idProduct);
    const product = isInCart[0];
    product.quantity = product.quantity + 1;
    product.total = product.quantity * product.price;
    cart.products = cart.products.filter((product) => product.id !== idProduct);
    cart.products.push(product);
    await this.update(id, cart);
    return cart;
  }
  async isProductInCart(id, idProduct) {
    const products = await this.AllProducts(id);
    return products.filter((product) => product.id === idProduct);
  }

  async deleteAllCarts() {
    await this.model.deleteMany({});
    console.log('--------------------');
    console.log('All Carts Deleted');
  }
}

module.exports = new Cart();
