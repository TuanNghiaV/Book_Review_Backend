const Book = require('../models/bookModel');

// Create a new book
exports.createBook = async (req, res) => {
    try {
        // Check for duplicate by title and author
        const existingBook = await Book.findOne({ title: req.body.title, author: req.body.author });
        if (existingBook) {
            return res.status(400).json({ message: 'A book with the same title and author already exists.' });
        }
        // Create a new book
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create book.', error: err.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve books.', error: err.message });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve the book.', error: err.message });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book.', error: err.message });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book.', error: err.message });
    }
};

// Add a review to a book
exports.addReview = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.reviews.push(req.body);
            await book.save();
            res.status(201).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to add review.', error: err.message });
    }
};

// Get all reviews for a book
exports.getReviews = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book.reviews);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve reviews.', error: err.message });
    }
};

// Delete a review from a book
exports.deleteReview = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (book) {
            const reviewIndex = book.reviews.findIndex(review => review._id.toString() === req.params.reviewId);
            if (reviewIndex > -1) {
                book.reviews.splice(reviewIndex, 1);
                await book.save();
                res.status(200).json({ message: 'Review deleted successfully' });
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete review.', error: err.message });
    }
};
