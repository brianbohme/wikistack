const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');

var Page = models.Page;
var User = models.User;

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/', function (req, res, next) {
  Page.findAll().then(function (pages) {
      res.render('index', {
        pages: pages
      });
    })
    .catch(next)
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/search', function (req, res, next) {
  var tagArr = req.query.tags.split(", ");
  Page.findByTag(tagArr).then(function (pages) {
    res.render('tagSeach', {
      pages: pages
    })
  })
});

router.get('/:urlTitle/similar', function (req, res, next) {
  Page.build().findPagesByTag().then(function (pages) {
    res.render('tagSeach', {
      pages: pages
    })
  })
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      },
      include: [{
        model: User,
        as: 'author'
      }]
    })
    .then(function (page) {
      // page instance will have a .author property
      // as a filled in user object ({ name, email })
      if (page === null) {
        res.status(404).send();
      } else {
        res.render('wikipage', {
          page: page
        });
      }
    })
    .catch(next)
});

router.post('/', urlencodedParser, function (req, res, next) {
  User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(', ')
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});


module.exports = router;
