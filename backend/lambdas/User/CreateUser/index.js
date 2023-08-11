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
};

const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.handler = async (event) => {
  const pool = await mysql.createConnection(connectionConfig);
  let { email, password } = JSON.parse(event.body);
  email = email.toLowerCase();
  const errorMsg = "Invalid email or email already registered.";
  try {
    // check if email already exists in db
    const [results, col] = await pool.execute(
        'SELECT COUNT(*) AS count FROM users WHERE email = ?',
        [email],
    );
    if (results[0].count > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: errorMsg }),
      };
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.execute(
      'INSERT INTO users (password, email) VALUES (?, ?)',
      [hashedPassword, email],
    );

    const [rows, fields] = await pool.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email],
    );

    await pool.execute(
      'INSERT INTO profiles (user_id) VALUES (?)',
      [rows[0].id],
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ user: rows[0] })
    };
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign up error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: msg })
    };
  }
};
