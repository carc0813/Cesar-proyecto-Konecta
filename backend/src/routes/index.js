const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');  // Importa los controladores de auth
const { createEmployee, getEmployees } = require('../controllers/employee.controller');  // Importa los controladores de employee
const { createRequest, getRequests, deleteRequest } = require('../controllers/request.controller');  // Importa los controladores de request
const { verifyToken, checkAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Autenticación
router.post('/register', registerUser);
router.post('/login', loginUser);

// CRUD de empleados (solo para administradores)
router.get('/employees', verifyToken, getEmployees);
router.post('/employees', verifyToken, checkAdmin, createEmployee);

// CRUD de solicitudes
router.get('/requests', verifyToken, getRequests);
router.post('/requests', verifyToken, checkAdmin, createRequest);
router.delete('/requests/:id', verifyToken, checkAdmin, deleteRequest);

module.exports = router;
