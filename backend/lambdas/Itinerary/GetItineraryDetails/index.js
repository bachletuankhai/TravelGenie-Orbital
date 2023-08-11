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
  const itemId = event.queryStringParameters.id;
  console.log(itemId);
  try {
    const [details, cols] = await pool.execute(
      'SELECT * FROM itineraries WHERE id = ?',
      [itemId],
    )
    const [items, fields] = await pool.execute(
      'SELECT * FROM plan_items WHERE itinerary_id = ?',
      [itemId],
    )
    
    let sortedItems = items.map((item) => {
      return {
        data: item,
        startTime: new Date(`${item.date}T${item.start_time}`).getTime(),
        endTime: new Date(`${item.date}T${item.end_time}`).getTime(),
      };
    });
    
    sortedItems.sort((b, a) => 
      b.startTime - a.startTime);
    console.log(sortedItems)
    sortedItems = sortedItems.map((item) => item.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ results: { details: details[0], items: sortedItems } }),
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}