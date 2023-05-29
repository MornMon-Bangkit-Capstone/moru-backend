const mysql = require('mysql');
// Create MySQL connection
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
});
module.exports = {
  getConnection(callback) {
    pool.getConnection(callback);
  },
};
