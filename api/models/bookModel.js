const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, required: true }, 
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  summary: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  reviews: [reviewSchema]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
