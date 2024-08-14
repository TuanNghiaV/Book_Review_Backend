const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./api/routes/bookRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
bookRoutes(app);

// Connect to MongoDB
const db = 'mongodb+srv://nghiangtgch220318:Hello206cc@mydb.rfisa31.mongodb.net/BookReviewApp';  
mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(process.env.PORT || 3001);
