const { Router } = require("express");

const { createEmployee, getEmployees} = require("../controllers/employee.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/employees", verifyToken, createEmployee); // Solo si el usuario está autenticado
router.get("/employees", verifyToken, getEmployees); // Solo si el usuario está autenticado

module.exports = router;
