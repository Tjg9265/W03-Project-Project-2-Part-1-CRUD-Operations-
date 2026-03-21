const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateBook = (book) => {
  return (
    book.title &&
    typeof book.title === 'string' &&
    book.author &&
    typeof book.author === 'string' &&
    book.genre &&
    typeof book.genre === 'string' &&
    typeof book.publishedYear === 'number' &&
    typeof book.pages === 'number' &&
    typeof book.rating === 'number' &&
    typeof book.inStock === 'boolean'
  );
};

const getAllBooks = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('books').find();
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('books').find({ _id: bookId });
    const books = await result.toArray();

    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      rating: req.body.rating,
      inStock: req.body.inStock
    };

    if (!validateBook(book)) {
      return res.status(400).json({ message: 'Invalid book data' });
    }

    const response = await mongodb.getDb().collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create book' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      rating: req.body.rating,
      inStock: req.body.inStock
    };

    if (!validateBook(book)) {
      return res.status(400).json({ message: 'Invalid book data' });
    }

    const response = await mongodb
      .getDb()
      .collection('books')
      .replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('books').deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};