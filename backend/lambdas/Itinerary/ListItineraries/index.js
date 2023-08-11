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
  const conn = await mysql.createConnection(connectionConfig);
  if (!event.queryStringParameters?.id) {
    // bad request
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No user id provided" }),
    };
  }
  const userId = event.queryStringParameters.id;
  console.log(userId);
  try {
    const [results, fields] = await conn.execute(
      'SELECT * FROM itineraries WHERE user_id = ?',
      [userId],
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}