const parseToNumber = (value, {req, location, path}) => {

    if(typeof value === "string"){
        
        const parsedValue = parseInt(value);
        if(isNaN(parsedValue)){

            return value;

        }
        return parsedValue;
    }



}

module.exports = parseToNumber;