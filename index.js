let config = require("./config.js");

var express = require('express');
var app = express();
let port = 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    if (config.requiresSetup) {
        res.render('pages/setup');
    } else {
        res.render('pages/index');
    }
});

app.post('/', function(req, res) {
    if (config.requiresSetup) {
        console.error("Test");
    } else {
        res.send(`<html lang="en"><head>
        <meta charset="utf-8">
        <title>Error</title>
        </head>
        <body>
        <pre>Cannot POST /</pre>

        </body></html>`);
    }
});

app.listen(config.server.port);
console.log(`Started the web server on port ${config.server.port}!`);