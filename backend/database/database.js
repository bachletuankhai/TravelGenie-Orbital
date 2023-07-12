require('dotenv').config();
const mysql = require('mysql2/promise');

const connectionConfig = {
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}

const pool = mysql.createPool({
  ...connectionConfig,
  connectionLimit: 15,
  ssl: {
    "rejectUnauthorized": true,
  },
  dateStrings: true,
})

exports.pool = pool;