const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Parameter = sequelize.define('Parameter', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, // ADD createdAt AND updatedAt
    tableName: 'Parameter'
});

module.exports = Parameter;