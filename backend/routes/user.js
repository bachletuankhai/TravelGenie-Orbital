const connectDb = require('../database/connectDb');
const bcrypt = require('bcrypt');

require('dotenv').config();
const express = require('express');
const router = express.Router();

const saltRounds = 10;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const database = await connectDb();
  const errorMsg = "Invalid email or email already registered.";
  try {
    await database.connect();

    // check if email already exists in db
    const [results, col] = await database.execute(
        'SELECT COUNT(*) AS count FROM users WHERE email = ?',
        [email],
    );
    if (results[0].count > 0) {
      return res.status(200).json({ error: errorMsg });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await database.execute(
      'INSERT INTO users (password, email) VALUES (?, ?)',
      [hashedPassword, email],
    );

    const [rows, fields] = await database.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email],
    );
    return res.status(200).json({ user: rows[0]});
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign up error: ${error}`);
    return res.status(401).json({ error: msg });
  } finally {
    await database.end();
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const conn = await connectDb();
  const errorMsg = "Incorrect email and/or password.";
  try {
    await conn.connect();
    console.log(`Logging in:`);
    // console.log(` Email: ${email}`);
    // console.log(` Password: ${password}`);

    const [results, fields] = await conn.execute(
        'SELECT * FROM users WHERE email = ?',
        [email],
    );
    if (results.length == 0) {
      console.log(` Response: rejected`)
      return res.status(200).json({ error: errorMsg });
    }
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err || !result) {
        console.log(` Response: rejected`)
        return res.status(200).json({ error: errorMsg });
      } else {
        console.log(` Response: accepted`)
        return res.status(200).json({ user: {
          id: results[0].id,
          email: results[0].email,
        }});
      }
    });
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign in error: ${error}`);
    return res.status(401).json({error: msg});
  } finally {
    await conn.end();
    console.log('Disconnected from database');
  }
})

router.get("/login", (req, res) => {
  return res.status(200).json({user: "login api"});
})

module.exports = router;