const { Router } = require("express");

const {createRequest, getRequests,deleteRequest} = require("../controllers/request.controller");
const { verifyToken, checkAdmin } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/requests", verifyToken, createRequest); // Solo si el usuario está autenticado
router.get("/requests", verifyToken, getRequests); // Solo si el usuario está autenticado
router.delete("/requests/:id", verifyToken, checkAdmin, deleteRequest); // Solo admin puede eliminar solicitudes

module.exports = router;
