const fs = require("fs").promises;
const { timeStamp } = require("console");
const { writeFile, readFile } = require("fs");
const moment = require("moment");
class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
        this.cart = [];
    }

    async create(){
        //create file 
        fs.writeFile(this.fileName, "[]", {flag: "wx"});
        return this.addNewCart()
    }

    async addNewCart(){
        try{
            const data = await this.readData()
            const id = data[data.length - 1] ? data[data.length - 1].id : 0
            const cart = {
                id: id + 1,
                products: [],
                timeStamp: moment().format("DD/MM/YYYY HH:mm:ss")
            }
            data.push(cart)
            await this.writeData(data)
            return { status: "success", nessage:"Cart Created", cartId: cart.id };
        } catch(error){
            return { status: "error", nessage: error.message };
        }
    }

    async addToCart(idCart, productId) {
        try{
            const productsTxt = await fs.readFile("./database/products.json", "utf8");
            const productsJSON = JSON.parse(productsTxt);
            const productFind = productsJSON.find(product => product.id == productId);
            if(!productFind){
                return { status: "error", message: "Product not found" }
            }
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id == idCart);
            if(cartIndex === -1){
                return { status: "error", message: "Cart not found" }
            }
            const newProductOnCart = {
                ...productFind,
                stock: productFind.stock - 1,
                timeStamp:moment().format("DD/MM/YYYY HH:mm:ss")

            }         
            carts[cartIndex].products.push(newProductOnCart);
            await this.writeData(carts);
            return { status: "success", message: "Product added to cart" }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    async getCartProducts(id) {
        try{
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id == id);
            if(cartIndex === -1){
                return { status: "error", message: "Cart not found" }
            }
            return { status: "success", message: "Cart found", products: carts[cartIndex].products }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }
    
    deleteCartById = async (id) =>{
        try{
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id == id);
            if(cartIndex === -1){
                return { status: "error", message: "Cart not found" }
            }
            carts.splice(cartIndex, 1);
            await this.writeData(carts);
            return { status: "success", message: "Cart deleted" }
        } catch (error) {
            return { status: "error", message: error.message }
        }
    }

    deleteProductCart = async (idCart, idProduct) =>{
        // Eliminar un producto del carrito por su id de carrito y de producto
        try{
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id == idCart);
            if(cartIndex === -1){
                return { status: "error", message: "Cart not found" }
            }
            const productIndex = carts[cartIndex].products.findIndex(product => product.id == idProduct);
            if(productIndex === -1){
                return { status: "error", message: "Product not found" }
            }
            carts[cartIndex].products.splice(productIndex, 1);
            await this.writeData(carts);
            return { status: "success", message: "Product deleted" }
        }  catch (error) {
            return { status: "error", message: error.message }
        }


    }

    async getAll() {
        return this.readData()
    }

    writeData(data) {
        return fs.writeFile(this.fileName, JSON.stringify(data, null, 2))
    }
    
    async readData () {
        const raw = await fs.readFile(this.fileName, "utf8")
        return JSON.parse(raw)
    }

}
module.exports = Contenedor;















/* 
    // Crea un carrito y lo guarda en un archivo JSON y devuelve el id del carrito
    async create() {
        const id = this.cart.length + 1;
        this.cart.push({id: id, timeStamp: moment().format("DD/MM/YYYY/ hh:mm:ss"),products: []});
        this.writeData(this.cart);
        return this.cart;
    }

    // Eliminar un producto del carrito por su id de producto
    async delete(id) {
        const cart = await this.readData();
        const newCart = cart.filter(cart => cart.id !== id);
        this.writeData(newCart);
        return newCart;
    }
    
    //Eliminar carrito por su id de carrito
    async deleteCart(id){
        const cart = await this.readData();
        const newCart = cart.filter(cart => cart.id === id);
        this.writeData(newCart);
        return newCart;
    }

    // Me permite listar todos los productos guardados en el carrito
    async getAll() {
        const cart = await this.readData();
        if (cart.length === 0) return 'No hay productos en el carrito';
        return cart[0].products;
    }
    
    //Para incorporar productos al carrito por su id de producto
    async searchProduct(idProducto) {
        //traer json products
        const productsTxt = await fs.readFile("./database/products.json", "utf8");
        const productsJSON = JSON.parse(productsTxt);
        const product = productsJSON.filter(product => product.id === Number(idProducto));
        // si no existe el producto poner un mensaje 
        if (product.length === 0) return 'No existe el producto';
        return product[0];
    }
    async addProduct (idProduct) {
        //Llamamos a searchProduct para traer el producto
        const product = await this.searchProduct(idProduct);
        if(product === 'No existe el producto') return product;
        //Buscar el carrito 
        const cart = await this.readData();
        //Agregar searchProduct al carrito
        cart[0].products.push({
            product,
            timeStamp: moment().format("DD/MM/YYYY/ hh:mm:ss"),
        });
        //Escribir en el archivo
        this.writeData(cart);
        return cart;
    }









*/