const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Note = sequelize.define('Note', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastUpdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userUpdate: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false, // ADD createdAt AND updatedAt
    tableName: 'Note'
});

module.exports = Note;