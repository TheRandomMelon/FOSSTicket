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
				res.render("dashboard.ejs", {
					cookies: req.cookies,
					session: session,
					user: user,
				});
			});
		});
	} else {
		res.redirect("/login");
	}
};

module.exports.info = {
	route: "/dashboard",
};
