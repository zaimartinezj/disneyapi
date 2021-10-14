const moment = require('moment');

const formatDate = (req, res, next) => {

    const date = req.body.dateCreated;

    if(!date){
        return res.status(400).json({
            success: false,
            msg: 'DateCreated is required'
        })
    }

    //const dateFormat = moment(date).format('YYYY-MM-DD');
    if(!moment(date, 'YYYY-MM-DD', true).isValid()){
        return res.status(400).json({
            success: false,
            msg: 'invalid date'
        })
        
    }

    next();

}

module.exports = formatDate;