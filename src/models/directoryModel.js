const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Directory = sequelize.define('Directory', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    afiliationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false, // ADD createdAt AND updatedAt
    tableName: 'Directory'
});

module.exports = Directory;