const connectionConfig = {
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
}

const mysql = require('mysql2/promise');

const connectDb = () => {
  try {
    console.log("Start connecting...")
    const connect = mysql.createConnection(connectionConfig);
    console.log("Connected to database successfully");
    return connect;
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDb;