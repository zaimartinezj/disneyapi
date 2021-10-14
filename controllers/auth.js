const { User } = require("../dbconfig/config");
const bcrypt = require('bcrypt');
const newToken = require("../helpers/create-jwt");
const sendEmail = require("../helpers/sendEmail");

const loginUser = async (req, res) => {

    try {
       const {email, password} = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user){
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if(!checkPassword){
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    const token = newToken(user.uid, user.name);

    return res.status(200).json({
        success: true,
        name: user.name,
        token
    }) 

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

}

const newUser = async (req, res) => {

    try {
       let { name, email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user){
        return res.status(400).json({
            success: false,
            msg: 'Email already taken'
        })
    }
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
        name, email, password
    })

    sendEmail(email, name);

    const token = newToken(newUser.uid, newUser.name);

    return res.status(200).json({
        success: true,
        name,
        token
    }) 
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            msg: 'Error'
        })

    }
}



module.exports = {
    newUser,
    loginUser
}