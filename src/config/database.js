require('dotenv').config();

const { Sequelize } = require('sequelize');

const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

// CREATE CONECCTION
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: false // DISABLE LOG IN SQL CONSOLE
});

// TEST CONENECTION 
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('CONNECTED TO DB.');
    } catch (error) {
        console.error('ERROR CONNECTION TO DB:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };