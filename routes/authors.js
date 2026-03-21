const router = require('express').Router();
const authorsController = require('../controllers/authors');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;