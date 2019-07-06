require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`Webserver started successfully on port ${PORT}`)
);
