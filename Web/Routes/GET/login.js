module.exports = async(req, res) => {
	if (req.cookies.session !== undefined) {
		res.redirect("/");
	} else {
		res.render("login.ejs", {
			cookies: req.cookies,
			session: null,
			user: null,
			notification: {
				display: false,
			},
		});
	}
};

module.exports.info = {
	route: "/login",
};
