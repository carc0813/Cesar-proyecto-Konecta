const server = require("./src/app");
const { conn } = require("./src/db");
//const seedDatabase = require("./src/routes/seed");

conn.sync({ force: true }).then(async () => {
  // Ejecutamos el seeding después de que las tablas se sincronicen
 // await seedDatabase(); 
  
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
