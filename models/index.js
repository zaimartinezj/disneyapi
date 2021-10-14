//Models

const associations = (sequelize, DataTypes) => {

    const Role = require('./Role')(sequelize, DataTypes);
    const User = require('./User')(sequelize, DataTypes);
    const Genre = require('./Genre')(sequelize, DataTypes);
    const Movie = require('./Movie')(sequelize, DataTypes);
    const Character = require('./Character')(sequelize, DataTypes);
    const CharactersMovie = require('./Characters_Movie')(sequelize, DataTypes);

    //Associations
    Genre.hasMany(Movie, {foreignKey: 'genre_id'})
    Movie.belongsTo(Genre, {foreignKey: 'genre_id'})

    Character.belongsToMany(Movie, {through: CharactersMovie, foreignKey: 'character_id'});
    Movie.belongsToMany(Character, {through: CharactersMovie, foreignKey: 'movie_id'});
    
    Role.hasMany(User);
    User.belongsTo(Role, {foreignKey: 'role_id'});
    

    

    return {User,
        Movie,
        Character,
        CharactersMovie,
        Genre,
        Role
    }

}

module.exports = associations;