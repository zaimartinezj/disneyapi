const CharacterModel = (sequelize, DataTypes) => {
    return sequelize.define('Character', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            defaultValue: "https://programacion.net/files/article/20160819020822_image-not-found.png"
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        history: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

module.exports = CharacterModel;
