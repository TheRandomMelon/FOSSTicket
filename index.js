let config = require("./config.js");
let express = require('express');
let app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
let bcrypt = require('bcrypt');

global.Sequelize = require('sequelize');
global.sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  	host: config.mysql.host,
 	dialect: 'mysql',
  	operatorsAliases: false,

  	pool: {
    	max: 5,
    	min: 0,
    	acquire: 30000,
    	idle: 10000
  	}
});

// Models
global.User = require("./models/User.js");

sequelize.authenticate()
  	.then(() => {
    	console.log('Connection has been established to the MySQL database successfully.');
  	})
  	.catch(err => {
		console.error('Unable to connect to the MySQL database:', err);
		process.exit(1);
  	});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    if (config.requiresSetup) {
        res.render('pages/setup');
    } else {
        res.render('pages/index');
    }
});

app.get('/dashboard', function(req, res) {
    res.render("pages/dashboard");
});

app.post('/', function(req, res) {
    if (config.requiresSetup) {
        let values = req.body;

        if (values.password.length < 8) {
            res.send("Password needs to be 8 characters or higher");
        } else if (values.username.length < 1 || values.fullname.length < 1 || values.email.length < 1) {
            res.send("Please define the username, full name and email fields.");
        }

        values.password = bcrypt.hashSync(values.password, 10);

        User.create({ username: values.username, fullname: values.fullname, password: values.password, email: values.email, agent: 1, pfp: "/img/logo.png" });
        res.redirect("/dashboard?firsttime=1");
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
console.log(`Started the web server on port ${config.server.port}! Enjoy FOSSTicket!`);