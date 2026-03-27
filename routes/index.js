const express = require('express');
const router = express.Router();

const booksRoutes = require('./books');
const authorsRoutes = require('./authors');
const authRoutes = require('./auth');

router.use('/books', booksRoutes);
router.use('/authors', authorsRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.send('Books Authors API is running');
});

module.exports = router;