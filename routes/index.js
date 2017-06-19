const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.get('/search', function (req, res, next) {
  res.render('search')
})

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

module.exports = router
