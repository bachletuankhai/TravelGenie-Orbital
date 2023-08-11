const mysql = require('mysql2/promise');
const connectionConfig = {
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    "rejectUnauthorized": true,
  },
  dateStrings: true,
}

const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.handler = async (event) => {
  if (!event.queryStringParameters?.id) {
    // bad request
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No id provided" }),
    };
  }
  const pool = await mysql.createConnection(connectionConfig);
  const id = event.queryStringParameters.id;
  let { oldPassword, newPassword } = JSON.parse(event.body);
  const errorMsg = "Incorrect password.";
  try {
    const [results, fields] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    const compare = await bcrypt.compare(oldPassword, results[0].password);
    if (!compare) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: errorMsg })
      };
    }
    const hash = await bcrypt.hash(newPassword, saltRounds);
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hash, id],
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ "message": "SUCCESS" })
    };
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign up error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: msg })
    };
  }
}