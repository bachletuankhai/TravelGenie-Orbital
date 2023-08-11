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
  const pool = await mysql.createConnection(connectionConfig);

  if (!event.queryStringParameters?.id) {
    // bad request
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No id provided" }),
    };
  }
  const id = event.queryStringParameters.id;
  let {
    name,
    startDate,
    endDate,
    location,
    photoUrl,
  } = JSON.parse(event.body);
  try {
    await pool.execute(
      'UPDATE itineraries SET name = ?, start_date = ?, end_date = ?, location = ?, photo_url = ? WHERE id = ?',
      [
        name,
        startDate,
        endDate,
        location,
        photoUrl,
        id,
      ]
  )
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}