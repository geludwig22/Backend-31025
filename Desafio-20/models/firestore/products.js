const { db } = require('../../config/firebase/firebase');

class Product {
  constructor() {
    this.collection = 'products';
  }

  async getAll() {
    const querySnapshot = await db.collection(this.collection).get(); //esto en controller
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  }

  async create(body) {
    const product = await db.collection(this.collection).add(body);
    return product;
  }

  async getById(id) {
    const product = await db.collection(this.collection).doc(id).get();
    return {
      id: product.id,
      ...product.data(),
    };
  }

  async deleteById(id) {
    const product = await db.collection(this.collection).doc(id).delete();
    return product;
  }

  async update(id, body) {
    const product = await db.collection(this.collection).doc(id).update(body);
    return product;
  }
}

module.exports = new Product();
