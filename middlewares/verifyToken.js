const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    try {
        const token = req.header('token');

        if(!token){
            return res.status(400).json({
                success: false,
                msg: 'Token must be provided'
            })
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT_KEY)

        if(!payload){
            return res.status(400).json({
                success: false,
                msg: 'Invalid token'
            })
        }
    
        req.name = payload.name;
        req.uid = payload.uid;
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error token'
            })
    }
    

    
}

module.exports = verifyToken;