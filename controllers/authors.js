const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateAuthor = (author) => {
  return (
    author.name &&
    typeof author.name === 'string' &&
    typeof author.birthYear === 'number' &&
    author.country &&
    typeof author.country === 'string' &&
    author.specialty &&
    typeof author.specialty === 'string'
  );
};

const getAllAuthors = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('authors').find();
    const authors = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('authors').find({ _id: authorId });
    const authors = await result.toArray();

    if (authors.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      country: req.body.country,
      specialty: req.body.specialty
    };

    if (!validateAuthor(author)) {
      return res.status(400).json({ message: 'Invalid author data' });
    }

    const response = await mongodb.getDb().collection('authors').insertOne(author);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create author' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const author = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      country: req.body.country,
      specialty: req.body.specialty
    };

    if (!validateAuthor(author)) {
      return res.status(400).json({ message: 'Invalid author data' });
    }

    const response = await mongodb
      .getDb()
      .collection('authors')
      .replaceOne({ _id: authorId }, author);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Author updated successfully' });
    } else {
      res.status(404).json({ message: 'Author not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('authors').deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};