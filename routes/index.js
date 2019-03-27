const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');

router.get('/', (req, res) => {
  res.render('index', { title: 'GO Transit DAV' });
});

router.post('/',
  [
      body('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
      body('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
    ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.send('Thank you for your registration!');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get('/list', (req, res) => {
  res.render('list', { title: 'Listing registrations' });
});

module.exports = router;
