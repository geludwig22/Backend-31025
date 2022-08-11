
//Midleware de multer
const path = require('path');
const auth = (value ,path) => {
    const admin = value; 
    return (req, res, next) => {
        if(admin){
            next();
        }else{
            res.status(401).send({error: 401, decripcion: `http://localhost/api/${path}${req.path} metodo: ${req.method} no autorizado`});
        }
    }
}

module.exports = auth