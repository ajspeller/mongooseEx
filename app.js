require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Book = require('./Book.model');

const db = process.env.MONGODB_URI;
const PORT = process.env.PORT || PORT;

mongoose.connect(db, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log({ error: err });
  }
  console.log(`Database connection established!`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`Webserver started successfully on port ${PORT}`)
);
