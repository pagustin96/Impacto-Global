const { DataTypes } = require("sequelize")

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        activo:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}