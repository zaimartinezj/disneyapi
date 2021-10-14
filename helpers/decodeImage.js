const fs = require("fs");

const decodeFile = (imageBase64) => {
    try {
        let typeImage = imageBase64.match(/[^:/]\w+(?=;|,)/)[0];
        const imageBase64Parsed = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageBase64Parsed, "base64");
        console.log(typeImage)
        return {buffer, typeImage};   
    } catch (error) {
        console.log(error)
    }
}

module.exports = decodeFile;