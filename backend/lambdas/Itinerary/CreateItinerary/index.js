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

  let {
    userId,
    name,
    startDate,
    endDate,
    location,
    photoUrl,
  } = JSON.parse(event.body);
  try {
    await conn.execute(
        'INSERT INTO itineraries (name, start_date, end_date, location, user_id, photo_url) VALUES (?, ?, ?, ?, ?, ?)',
        [name, startDate, endDate, location, userId, photoUrl]
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