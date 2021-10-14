const CharactersMovieModel = (sequelize, DataTypes) => {
    return sequelize.define('CharactersMovie', {
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        character_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}

module.exports = CharactersMovieModel;