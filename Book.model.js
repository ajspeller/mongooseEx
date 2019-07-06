const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  category: {
    type: String
  }
});

module.exports = mongoose.model('Book', BookSchema);
