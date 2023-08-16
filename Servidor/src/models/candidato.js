const { DataTypes} = require('sequelize')
const sequelize = require('../config')

module.exports = (sequelize, type) => {
    return sequelize.define('candidato', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cliente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        perfil:{
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
        rate:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activo:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        reclutadora:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}