const server = require("./src/app");
const { conn } = require("./src/db");
require("dotenv").config();

//const seedDatabase = require("./src/routes/seed");

conn.sync({ force: false}).then(async () => {
  // Ejecutamos el seeding después de que las tablas se sincronicen
 //await seedDatabase(); 
  
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
