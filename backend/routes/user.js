const pool = require('../database/database').pool;

const bcrypt = require('bcrypt');

require('dotenv').config();

const express = require('express');
const router = express.Router();

const saltRounds = 10;

// register a new user
router.post("/", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const errorMsg = "Invalid email or email already registered.";
  try {
    // check if email already exists in db
    const [results, col] = await pool.execute(
        'SELECT COUNT(*) AS count FROM users WHERE email = ?',
        [email],
    );
    if (results[0].count > 0) {
      return res.status(200).json({ error: errorMsg });
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
    )

    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    const msg = error?.message || error;
    console.log(`Sign up error: ${error}`);
    return res.status(401).json({ error: msg });
  }
});

// user login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const errorMsg = "Incorrect email and/or password.";
  try {
    console.log(`Logging in:`);
    // console.log(` Email: ${email}`);
    // console.log(` Password: ${password}`);

    const [results, fields] = await pool.execute(
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
  }
})

// change user's email
router.post("/:id/email", async (req, res) => {
  const id = req.params.id;
  let { email } = req.body;
  email = email.toLowerCase();
  try {
    await pool.execute(
      'UPDATE users SET email = ? WHERE id = ?',
      [email, id],
    )

    return res.status(200).json({ email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
})

// change user's display name
router.post("/:id/name", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    await pool.execute(
      'UPDATE profiles SET name = ? WHERE user_id = ?',
      [name, id],
    )
    return res.status(200).json({ name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
})

// change user's avatarUrl
router.post("/:id/avatar", async (req, res) => {
  const id = req.params.id;
  const { avatarUrl } = req.body;
  try {
    await pool.execute(
      'UPDATE profiles SET avatarUrl = ? WHERE user_id = ?',
      [avatarUrl, id],
    )
    return res.status(200).json({ avatarUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
})

// change user's password
router.post("/:id/password", async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const errorMsg = "Incorrect password.";
  try {
    const [results, fields] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    const compare = await bcrypt.compare(oldPassword, results[0].password);
    if (!compare) {
      return res.status(400).json({ error: errorMsg });
    }
    const hash = await bcrypt.hash(newPassword, saltRounds);
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hash, id],
    );
    return res.status(200).json({})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
})

// delete an user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id],
    );
    await pool.execute(
      'DELETE FROM profiles WHERE user_id = ?',
      [id]
    );
    return res.status(200).json({})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
})

module.exports = router;