
const Busboy = require("busboy")

const formatFormData = (req, res, next) => {

    var busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy)
    
    let url = '';
    busboy.on('file', async function(fieldname, file, filename) {
         
         req.body.image = {file, filename};
         
         console.log("cargo el file")
         next()
         
    });

    busboy.on('field', function(fieldname, val) {
        req.body[fieldname] = val
        console.log("cargo el campo", fieldname)
      });
    
}

module.exports = formatFormData;