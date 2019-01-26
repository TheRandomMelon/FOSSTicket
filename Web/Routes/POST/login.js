const bcrypt = require("bcrypt");

module.exports = async(req, res) => {
	let values = req.body;

	User.findOne({
		where: { username: values.username },
	}).then(user => {
		if (user === null) {
			res.render("login.ejs", {
				session: null,
				user: null,
				notification: {
					display: true,
					title: "Couldn't find you",
					description: "You may not have an account.",
					color: "danger",
				},
				cookies: req.cookies,
			});
		} else if (bcrypt.compareSync(values.password, user.dataValues.password)) {
			let time = Math.round((new Date()).getTime() / 1000);
			let expTime = Math.round((new Date()).getTime() / 1000) + 900000;
			let token = makeToken(50);

			Session.create({ user_id: user.dataValues.id, token: token, timecreated: time, expirytime: expTime })
				.catch(err => {
					winston.error(err);
				});
			res.cookie("session", token, { expires: new Date(Date.now() + 900000), httpOnly: false, sameSite: true });

			res.redirect("/");
		} else {
			res.render("login.ejs", {
				session: null,
				user: null,
				notification: {
					display: true,
					title: "Invalid password",
					description: "Try typing it again.",
					color: "danger",
				},
				cookies: req.cookies,
			});
		}
	});
};

module.exports.info = {
	route: "/login",
};
