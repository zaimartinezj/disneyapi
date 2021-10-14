const { Sequelize } = require('sequelize');

const RoleModel = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

module.exports = RoleModel;
