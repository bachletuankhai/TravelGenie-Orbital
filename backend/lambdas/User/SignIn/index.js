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
  const pool = await mysql.createConnection(connectionConfig);
  let { email, password } = JSON.parse(event.body);
  email = email.toLowerCase();
  const errorMsg = "Incorrect email and/or password.";
  try {
    const [results, fields] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );
    if (results.length == 0) {
      console.log(` Response: rejected`)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: errorMsg })
      }
    }
    const result = await bcrypt.compare(password, results[0].password);
    if (!result) {
      console.log(` Response: rejected`)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: errorMsg })
      }
    } else {
      console.log(` Response: accepted`)
      const [profiles, col] = await pool.execute(
        'SELECT * FROM profiles WHERE user_id = ?',
        [results[0].id]
      );
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: results[0].id,
            email: results[0].email,
            avatarUrl: profiles[0]?.avatarUrl,
            name: profiles[0]?.name,
          }
        })
      };
    }
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign up error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: msg })
    };
  }
}