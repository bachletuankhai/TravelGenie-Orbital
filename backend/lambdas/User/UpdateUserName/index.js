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
  const { name } = JSON.parse(event.body);
  try {
    await pool.execute(
      'UPDATE profiles SET name = ? WHERE user_id = ?',
      [name, id],
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ name })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}