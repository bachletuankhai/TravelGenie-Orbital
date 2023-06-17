require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 8000

app.use(express.json())

const userRouter = require('./routes/user');

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})