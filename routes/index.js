const router = require('express').Router();

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

router.get('/', (req, res) => {
  res.send('Books and Authors API');
});

module.exports = router;