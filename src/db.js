const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = pool;
