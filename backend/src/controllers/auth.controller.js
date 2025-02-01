
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../db');
require("dotenv").config();
// Registrar un usuario
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username, password: hashedPassword, role });
        res.status(201).json({ message: "Usuario creado con éxito", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Iniciar sesión (Login)
const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar el usuario en la base de datos
      const user = await User.findOne({ where: { username } });
      console.log('Usuario encontrado:', user);  // Verifica si el usuario existe
  
      if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      // Verificar la contraseña
      console.log('Contraseña enviada:', password);
      console.log('Contraseña almacenada:', user.password);
      console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      // Generar el token
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      
     
      
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error('Error en login:', error);  // Log para ver detalles del error
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  };

module.exports = { registerUser, loginUser };
