const express = require('express');
const router = express.Router();
const {
  body,
  validationResult
} = require('express-validator/check');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'GO Transit DAV'
  });
});

router.get('/viz/point/:id', (req, res) => {
  res.render('viz_point', {
    title: 'GO Transit DAV'
  });
});

router.get('/routes', (req, res) => {
  res.render('routes', {
    title: 'GO Transit DAV'
  });
});


module.exports = router;