const express = require('express');
const passport = require('passport');

const router = express.Router();

// login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    res.send('Login successful');
  }
);

// logout
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Logged out');
  });
});

// failure
router.get('/failure', (req, res) => {
  res.status(401).send('Login failed');
});

module.exports = router;