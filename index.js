var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'gyuras',
    cookie: {
      maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
  }));
  

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(function(req, res, next) {
    res.error = [];
    res.tpl = {};
    
    return next();
});

require('./routes/planlist')(app);
require('./routes/commentlist')(app);
require('./routes/outside')(app);


app.use(function(err, req, res, next) {
    res.status(500).send('Error');

    console.error(err.stack);
});


var server = app.listen(3000, function () {
    console.log("On: 3000");
});