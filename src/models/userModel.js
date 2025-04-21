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
    timestamps: false, // ADD createdAt AND updatedAt
    tableName: 'User'
});

module.exports = User;