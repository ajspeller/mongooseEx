require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Book = require('./Book.model');

const db = process.env.MONGODB_URI;
const PORT = process.env.PORT || PORT;

mongoose.connect(
  db,
  { useNewUrlParser: true, useFindAndModify: false },
  (err, client) => {
    if (err) {
      return console.log({ error: err });
    }
    console.log(`Database connection established!`);
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hola');
});

app.get('/books', (req, res) => {
  console.log(`Retrieve all books!`);
  Book.find({}).exec((err, books) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.json(books);
  });
});

app.get('/books/:id', (req, res) => {
  console.log(`Retrieve a single book`);
  const { id: _id } = req.params;
  Book.findOne({ _id }).exec((err, book) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    res.json(book);
  });
});

app.post('/books', (req, res) => {
  console.log(`Posting a new book`);
  const { title, author, category } = req.body;
  const newBook = new Book({
    title,
    author,
    category
  });
  newBook.save((err, book) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.status(200).send(newBook);
  });
});

app.post('/books2', (req, res) => {
  console.log(`Post book using create()`);
  Book.create(req.body, (err, book) => {
    if (err) {
      return res.send({ error: err });
    }
    res.send(book);
  });
});

app.put('/books/:id', (req, res) => {
  console.log(`Updating a book`);
  const { id: _id } = req.params;
  Book.findOneAndUpdate(
    { _id },
    { $set: { title: req.body.title } },
    { upsert: true },
    (err, updatedBook) => {
      if (err) {
        return res.send({ error: err });
      }
      res.status(204).send(updatedBook);
    }
  );
});

app.delete('/books/:id', (req, res) => {
  console.log(`Delete a book`);
  const { id: _id } = req.params;
  Book.findOneAndRemove(
    {
      _id
    },
    (err, book) => {
      if (err) {
        return res.status(404).send({ error: err });
      }
      res.status(204).send(book);
    }
  );
});

app.listen(PORT, () =>
  console.log(`Webserver started successfully on port ${PORT}`)
);
