const ModelCart = require('../Models/modelCarrito');
const modelCart = new ModelCart("./database/cart.json");

const createCart = async (req, res) => {
    const cart =  await modelCart.create();
    res.send(cart);
}

const deleteCart = async (req, res) => {
    const data = await modelCart.deleteCartById(req.params.id);
    res.send(data);
}   

const deleteProductOnCart = async (req, res) => {
    const { id, id_prod } = req.params;
    const cart = await modelCart.deleteProductCart(id, id_prod);
    res.send(cart);
}

const getCartProducts = async (req, res) => {
    const { id } = req.params;
    const cart = await modelCart.getCartProducts(id);
    res.send(cart);
}   

const addProductOnCart = async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;
    const cart = await modelCart.addToCart(id , productId);
    res.send(cart);
}


module.exports = {
    createCart,
    deleteCart,
    deleteProductOnCart,
    getCartProducts,
    addProductOnCart
}