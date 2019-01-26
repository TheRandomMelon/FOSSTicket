module.exports = async(req, res) => {
	if (req.cookies.session !== undefined) {
		Session.findOne({
			where: {
				token: req.cookies.session,
			},
		}).then(session => {
			User.findOne({
				where: {
					id: session.dataValues.user_id,
				},
			}).then(user => {
				if (user.dataValues.agent !== 1) {
					res.render("Errors/403.ejs", {
						cookies: req.cookies,
						session: session,
						user: user,
					});
				} else {
					res.render("dashboard.ejs", {
						cookies: req.cookies,
						session: session,
						user: user,
					});
				}
			});
		});
	} else {
		res.redirect("/login");
	}
};

module.exports.info = {
	route: "/dashboard",
};
