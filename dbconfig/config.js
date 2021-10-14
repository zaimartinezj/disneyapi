const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

//Conection DB
const sequelize = new Sequelize("disney", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'mysql',
    port: process.env.DB_PORT || '3306',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(()=>
              console.log("DB Authentication Successfully"))
    .catch(
        (err)=>
              console.log("Error DB Authentication"))

const {User,
    Movie,
    Character,
    CharactersMovie,
    Genre,
    Role
} = require("../models/index")(sequelize, DataTypes)


sequelize.sync({force:false}).then(()=>{
    console.log("OK DB Sync")

}).catch((err)=>console.log("Error DB Sync"))

module.exports = {sequelize, User,
    Movie,
    Character,
    CharactersMovie,
    Genre,
    Role
};