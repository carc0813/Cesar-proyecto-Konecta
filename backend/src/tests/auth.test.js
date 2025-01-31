const request = require('supertest');
const app = require('../app'); // Asegúrate de que tu app esté exportada desde tu archivo principal (por ejemplo, app.js)

describe('POST /register', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testUser', password: 'testPassword', role: 'employee' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario creado con éxito');
    expect(response.body.user).toHaveProperty('id');
  });
});

describe('POST /login', () => {
    it('should log in the user and return a JWT', async () => {
      // Primero crea el usuario
      await request(app)
        .post('/register')
        .send({ username: 'testUser', password: 'testPassword', role: 'employee' });
  
      const response = await request(app)
        .post('/login')
        .send({ username: 'testUser', password: 'testPassword' });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
  describe('GET /employees', () => {
    it('should return all employees', async () => {
      // Primero, se asume que el usuario está autenticado (obteniendo el token)
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'testUser', password: 'testPassword' });
  
      const token = loginResponse.body.token;
  
      const response = await request(app)
        .get('/employees')
        .set('Authorization', `Bearer ${token}`); // Se incluye el token en el encabezado
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('employees');
      expect(Array.isArray(response.body.employees)).toBe(true);
    });
  });
    
  describe('POST /employees', () => {
    it('should create a new employee (admin only)', async () => {
      // Primero, se crea un usuario admin
      const adminResponse = await request(app)
        .post('/register')
        .send({ username: 'adminUser', password: 'adminPassword', role: 'admin' });
  
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'adminUser', password: 'adminPassword' });
  
      const token = loginResponse.body.token;
  
      const response = await request(app)
        .post('/employees')
        .set('Authorization', `Bearer ${token}`) // Se incluye el token de admin
        .send({ nombre: 'John Doe', salario: 50000, fecha_ingreso: '2025-01-30' });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('employee');
      expect(response.body.employee).toHaveProperty('id');
    });
  });
  describe('POST /requests', () => {
    it('should create a new request (admin only)', async () => {
      // Crear el usuario admin
      const adminResponse = await request(app)
        .post('/register')
        .send({ username: 'adminUser', password: 'adminPassword', role: 'admin' });
      
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'adminUser', password: 'adminPassword' });
  
      const token = loginResponse.body.token;
  
      // Crear un empleado de prueba
      const employeeResponse = await request(app)
        .post('/employees')
        .set('Authorization', `Bearer ${token}`) // Usar el token de admin
        .send({ nombre: 'John Doe', salario: 50000, fecha_ingreso: '2025-01-30' });
  
      const employeeId = employeeResponse.body.employee.id; // Suponiendo que el empleado tiene un 'id' en la respuesta
  
      // Crear una solicitud para el empleado creado
      const response = await request(app)
        .post('/requests')
        .set('Authorization', `Bearer ${token}`) // Usar el token de admin
        .send({
          codigo: 'REQ001',
          descripcion: 'Description of request',
          resumen: 'Summary of the request',
          id_empleado: employeeId // Usar el ID del empleado creado
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('request');
    });
  });
  