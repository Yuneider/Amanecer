const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pillar: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, {
    timestamps: true, // ADD createdAt AND updatedAt
    tableName: 'user'
});

module.exports = User;