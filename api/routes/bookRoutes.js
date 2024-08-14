const express = require('express');
const bookController = require('../controllers/bookController');

const bookRoutes = (app) => {
    // CRUD operations for books
    app.route('/books')
        .post(bookController.createBook)   // Create a new book
        .get(bookController.getBooks);    // Get all books

    app.route('/books/:id')
        .get(bookController.getBookById)   // Get a single book by ID
        .put(bookController.updateBook)    // Update a book by ID
        .delete(bookController.deleteBook); // Delete a book by ID

    // Review operations
    app.route('/books/:id/reviews')
        .post(bookController.addReview)    // Add a review to a book
        .get(bookController.getReviews);   // Get all reviews for a book

    app.route('/books/:bookId/reviews/:reviewId')
        .delete(bookController.deleteReview); // Delete a review from a book
};

module.exports = bookRoutes;
