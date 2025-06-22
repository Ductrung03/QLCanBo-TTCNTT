// //server/src/db.js
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => console.log("MySQL Connected ✅"))
//   .catch((err) => console.error("DB connection error:", err));

// module.exports = sequelize;

// server/src/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,   
  process.env.DB_USER,   
  process.env.DB_PASS,  
  {
    host: process.env.DB_HOST, 
    dialect: "mssql",          
    port: 1433,                
    dialectOptions: {
      options: {
        encrypt: false,        
        trustServerCertificate: true, 
      },
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("MSSQL Connected ✅"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = sequelize;
