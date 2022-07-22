const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    //Carpeta donde lo voy a guardar
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img'));
    },
    //Con que nombre lo voy a guardar
    filename: (req, file, cb)=>{
        cb(null, file.filename + "-" + Date.now()); 
    }
})

//Midleware de multer
const upload = multer({ storage });

module.exports = upload