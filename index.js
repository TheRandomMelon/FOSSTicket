var express = require('express');
var app = express();
let port = 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(port);
console.log(`Started the web server on port ${port}!`);