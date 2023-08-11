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
  try {
    await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id],
    );
    await pool.execute(
      'DELETE FROM profiles WHERE user_id = ?',
      [id]
    );
    return {
      statusCode: 200,
      body: JSON.stringify({})
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}