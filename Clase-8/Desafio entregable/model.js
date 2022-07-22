const fs = require("fs").promises;

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
        this.products = [];
    }


    async updateById(id, newObj){
        // Recibe y actualiza un producto según su id.
        //1- buscan el archivo y lo guardan en una variable
        //2- crean una variable en donde convierten ese archivo a json
        //3- buscan el id en el array
        //4 - actualizan el objeto
        //5 - convierten el array a json
        //6 - guardan el json en el archivo

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
        // Metodo asyc/await con promesas.Recibe un objeto, lo guarda en el archivo productos, devuelve el id asignado.
        //1- leen el archivo y lo guardan en una variable
        //2- leen el archivo y lo convierten a json
        //3- agregan el nuevo objeto al array
        //4- convierten el array a json
        //5- guardan el json en el archivo
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
        //Devuelve un objeto al azar del archivo.
        //1- buscan el archivo y lo guardan en una variable
        //2- crean una variable en donde convierten ese archivo a json 
        //3- crean una variable que guarda el numero aleatorio
        //4 - retornan el objeto
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
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        //1- buscan el archivo y lo guardan en una variable
        //2- crean una variable en donde convierten ese archivo a json 
        //3- buscan el id en el array
        //4 - retornan el objeto
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
        // Devuelve un array con los objetos presentes en el archivo.  
        //1- buscan el archivo y lo guardan en una variable
        //2- crean una variable en donde convierten ese archivo a json recuerden
        //3- agregan ese archivo json en un nuevo array
        //4 - retornan el array
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
        //Elimina todos los objetos del archivo.
        //1- buscan el archivo y lo guardan en una variable
        //2- crean una variable en donde convierten ese archivo a json 
        //3- eliminan todos los objetos del array
        //4 - convierten el array a json
        //5 - guardan el json en el archivo
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
