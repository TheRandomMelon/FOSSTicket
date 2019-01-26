const bcrypt = require("bcrypt");

module.exports = async(req, res) => {
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
};
module.exports.info = {
	route: "/",
};
