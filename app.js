const morgan = require('morgan');
const parser = require('body-parser');
const express = require('express')
const app = express();
const nunjucks = require('nunjucks');
const models = require('./models');
const router = require('./routes/index');
/////////////////////////////

app.use(express.static('public'));

app.use('/', router);

/////////////////////////////

models.db.sync({force: true})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
  })
  .catch(console.error);

/////////////////////////////


var env = nunjucks.configure('views', {
  noCache: true
});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

