
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = decoded;  // Decodificando el token y añadiendo los datos del usuario a la petición
        next();
    });
};

// Middleware para verificar si el usuario es admin
const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo administradores' });
    }
    next();
};

module.exports = { verifyToken, checkAdmin };
