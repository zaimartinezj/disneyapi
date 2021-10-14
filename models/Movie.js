const { Sequelize } = require('sequelize');


const MovieModel = (sequelize, DataTypes) => {

    return sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://programacion.net/files/article/20160819020822_image-not-found.png"
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        rating: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    })
}
module.exports=MovieModel;
