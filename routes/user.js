const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');

var Page = models.Page;
var User = models.User;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res, next) {
  User.findAll({}).then(function (users) {
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/:userId', function (req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
    .then(function (values) {
      var user = values[0];
      var pages = values[1];
      res.render('user', { user: user, pages: pages });
    })
    .catch(next);

});

module.exports = router
