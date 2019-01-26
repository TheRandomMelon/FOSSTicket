module.exports = async(req, res) => {
	if (req.cookies.session !== undefined) {
		Session.findOne({
			where: {
				token: req.cookies.session,
			},
		}).then(session => {
			if (session === null) {
				res.redirect("/login");
			} else {
				Session.destroy({
					where: {
						token: req.cookies.session,
					},
				}).then(data => {
					console.log(`Deleted ${data} sessions.`);

					res.clearCookie("session");
					res.render("signedout.ejs", {
						session: null,
						user: null,
						cookies: req.cookies,
					});
				}).catch(err => {
					winston.error(err);
				});
			}
		});
	} else {
		res.redirect("/login");
	}
};

module.exports.info = {
	route: "/signout",
};
