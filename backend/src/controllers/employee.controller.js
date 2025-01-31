
const { Employee } = require('../db');

// Crear un empleado
const createEmployee = async (req, res) => {
    const { fecha_ingreso, nombre, salario } = req.body;
    try {
        const employee = await Employee.create({ fecha_ingreso, nombre, salario });
        res.status(201).json({ employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los empleados
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEmployee, getEmployees };
