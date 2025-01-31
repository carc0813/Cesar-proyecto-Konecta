// const { User, Employee, Request } = require('../db');
// const { v4: uuidv4 } = require("uuid");

// const seedDatabase = async () => {
//   try {
//     await User.destroy({ where: {} });  // Elimina todos los registros de la tabla Users
//     console.log("📌 Insertando datos de prueba...");
   
//     // 🔹 Crear un empleado (sin employeeId)
//     const employee = await Employee.create({
//       id: uuidv4(),
//       fecha_ingreso: new Date("2023-01-15"),
//       nombre: "John Doe",
//       salario: 5000,
//     });

//     // 🔹 Crear un usuario administrador (SIN employeeId)
//     const adminUser = await User.create({
//       id: uuidv4(),
//       username: "admin_user",
//       password: "admin123",
//       role: "admin",
//       employeeId: null,
//     });

//     // 🔹 Crear un usuario empleado y asociarlo con el empleado
//     const employeeUser = await User.create({
//       id: uuidv4(),
//       username: "employee_user",
//       password: "employee123",
//       role: "employee",
//       employeeId: employee.id,  // Asociamos el usuario al empleado
//     });

//     console.log("✅ Usuarios y empleados insertados correctamente.");

//     // 🔹 Crear solicitudes (Request) asociadas al empleado
//     const request1 = await Request.create({
//       id: uuidv4(),
//       codigo: "REQ-001",
//       descripcion: "Solicitud de vacaciones",
//       resumen: "2 semanas de vacaciones",
//       id_empleado: employee.id, // Relación correcta
//     });

//     const request2 = await Request.create({
//       id: uuidv4(),
//       codigo: "REQ-002",
//       descripcion: "Reembolso de gastos",
//       resumen: "Reembolso de viáticos por viaje de trabajo",
//       id_empleado: employee.id, // Relación correcta
//     });

//     console.log("✅ Solicitudes insertadas correctamente.");
//     process.exit();
//   } catch (error) {
//     console.error("❌ Error al insertar datos de prueba:", error);
//     process.exit(1);
//   }
// };

// seedDatabase();
