const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');

var Page = models.Page;
var User = models.User;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res, next) {
  Page.findAll().then(function (pages) {
    res.render('index', {pages : pages});
  })
  .catch(next)
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (page) {
      res.render('wikipage', {page: page});
    })
    .catch(next);

});

router.post('/', urlencodedParser, function (req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });

  page.save().then(function (savedPage) {
    res.redirect(savedPage.route); // route virtual FTW
  }).catch(next);
});

module.exports = router;


