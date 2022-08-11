const fs = require("fs").promises;

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
        this.products = [];
    }

    async updateById(id, newObj){
        const response = {
            data: null,
            error: 'No se pudo actualizar el producto'
        };

        try{
            const file = await fs.readFile(this.fileName, "utf-8");
            const products = JSON.parse(file);
            const productIndex = products.findIndex(product => product.id == id);

            if( productIndex === -1){
                response.error = 'No se encontró el producto con el id ' + id;
            }else{
                //Asignarle el id al nuevo objeto
                newObj.id = Number(id);
                products[productIndex] = newObj;
                await fs.writeFile(this.fileName, JSON.stringify(products));
                response.data = products[productIndex];
            }
        }
        catch(error){
            response.error = 'No se pudo actualizar el producto';
        }
        
        return response;

    }
    async save(newObj){
        const response = {
            data:[],
            error: 'No se pudo guardar el producto'
        }

        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            newObj.id = json.length + 1;
            json.push(newObj);
            console.log(json);
            let jsonString = JSON.stringify(json);
            await fs.writeFile(this.fileName, jsonString);
            response.data = json;
        }
        catch(error){
            response.error = error;
        }

        return response;
    }
    async getProductRandom(){
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            let random = Math.floor(Math.random() * (json.length));
            return json[random];
        }
        catch(error){
            console.log(error);
        }
    }

    async getById(id){
        const response = {
            data:[],
            error: 'Producto no encontrado'
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            let product = json.find(product => product.id == parseInt(id));
            response.data = product;
        }
        catch(error){
            response.error = error; 
        }


        return response;
    }

    async getAll(){ 
        const response = {
            data:[],
            error: 'No se pudieron obtener los productos'
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            this.products = json;
            response.data = this.products;
        }
        catch(error){
            response.error = error; 
        }


        return response;
    }
    async deleteById(id){
        //Elimina el objeto con el id recibido.
        const response ={
            data: [],
            error: ''
        }
        try{
            let file = await fs.readFile(this.fileName, "utf8");
            let json = JSON.parse(file);
            //Si el id existe en el array devolver true o false 
            let productIndex = json.findIndex(product => product.id == id);
            console.log(productIndex);
            if( productIndex === -1){
                response.error = 'No se encontró el producto';
            }else{
                let product = json.filter(product => product.id != id);
                this.products = product;
                let jsonString = JSON.stringify(product);
                fs.writeFile(this.fileName, jsonString);
                response.data = this.products;
            }
        }
        catch(error){
            response.error = 'No se pudo eliminar el producto'; 
        }


        return response;
    }

    async deleteAll(){
        try{

            let product = [];
            this.products = product;
            let jsonString = JSON.stringify(product);
            fs.writeFile(this.fileName, jsonString);
        }
        catch(error){
            console.log(error);
            send.sendStatus()
        } 
    }
}

module.exports = Contenedor;