
const { Request } = require('../db');

// Crear una solicitud
const createRequest = async (req, res) => {
    const { codigo, descripcion, resumen, id_empleado } = req.body;
    try {
        const request = await Request.create({ codigo, descripcion, resumen, id_empleado });
        res.status(201).json({ request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las solicitudes
const getRequests = async (req, res) => {
    try {
        const requests = await Request.findAll();
        res.json({ requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una solicitud
const deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const request = await Request.destroy({ where: { id } });
        if (request) {
            res.json({ message: 'Solicitud eliminada' });
        } else {
            res.status(404).json({ message: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRequest, getRequests, deleteRequest };
