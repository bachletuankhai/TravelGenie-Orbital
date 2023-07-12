const pool = require('../database/database').pool;

require('dotenv').config();

const express = require('express');
const router = express.Router();

// get a list of user's itineraries
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [results, fields] = await pool.execute(
      'SELECT * FROM itineraries WHERE user_id = ?',
      [userId],
    )

    return res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
})

// create a new plan
router.post('/', async (req, res) => {
  let {
    userId,
    name,
    startDate,
    endDate,
    location,
    photoUrl,
  } = req.body;
  try {
    await pool.execute(
        'INSERT INTO itineraries (name, start_date, end_date, location, user_id, photo_url) VALUES (?, ?, ?, ?, ?, ?)',
        [name, startDate, endDate, location, userId, photoUrl]
    )
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
})

// create a new item in a plan
router.post('/:id', async (req, res) => {
  const id = req.params.id;
  let {
    name,
    subtitle,
    date,
    startTime,
    endTime,
    placeId,
  } = req.body;
  try {
    await pool.execute(
        'INSERT INTO plan_items (itinerary_id, name, subtitle, date, start_time, end_time, place_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          name,
          subtitle,
          date,
          startTime,
          endTime,
          placeId,
        ]
    )
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
})

// get details of a itinerary
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [details, cols] = await pool.execute(
      'SELECT * FROM itineraries WHERE id = ?',
      [id],
    )
    const [items, fields] = await pool.execute(
      'SELECT * FROM plan_items WHERE itinerary_id = ?',
      [id],
    )

    console.log(details);
    console.log(items);

    return res.status(200).json({ results: { details: details[0], items } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
})


module.exports = router;