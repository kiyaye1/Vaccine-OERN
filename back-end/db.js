const oracledb = require('oracledb');
require('dotenv').config();

async function getDBConnection() {
    try {
      return await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionString: process.env.DB_CONNECTION_STRING,
      });
    } catch (error) {
      console.error("Database Connection Error:", error.message);
      throw error;
    }
  }

module.exports = getDBConnection;
