const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js');
const userRouter = require('./user.js');

router.use('./wiki.js', wikiRouter);

module.exports = router;

