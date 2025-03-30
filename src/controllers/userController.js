const User = require('../models/userModel');

// 🔹 Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Consulta SQL con Sequelize
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

module.exports = { getUsers };