module.exports = async(req, res) => {
	if (config.requiresSetup) {
		res.render("setup.ejs");
	} else if (req.cookies.session !== undefined) {
		Session.findOne({
			where: {
				token: req.cookies.session,
			},
		}).then(session => {
			if (session === null) {
				res.redirect("/");
			} else {
				User.findOne({
					where: {
						id: session.dataValues.user_id,
					},
				}).then(user => {
					res.render("index.ejs", {
						cookies: req.cookies,
						session: session,
						user: user,
					});
				});
			}
		});
	} else {
		res.render("index.ejs", {
			cookies: req.cookies,
			session: null,
			user: null,
		});
	}
};

module.exports.info = {
	route: "/",
};
