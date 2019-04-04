var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

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