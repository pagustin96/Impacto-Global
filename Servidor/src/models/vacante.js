const { DataTypes} = require('sequelize')
const sequelize = require('../config')

module.exports = (sequelize, type) => {
    return sequelize.define('vacante', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empresa:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        seniority:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingles:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        skills:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rate:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activo:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        comienzo:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        cierre:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    })
}