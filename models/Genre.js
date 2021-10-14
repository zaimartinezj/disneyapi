const GenreModel = (sequelize, DataTypes) => {
    return sequelize.define('Genre', {
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
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://programacion.net/files/article/20160819020822_image-not-found.png"
        }
    })
}



module.exports = GenreModel;
