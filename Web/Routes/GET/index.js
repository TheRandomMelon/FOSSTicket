module.exports = async(req, res) => {
	if (config.requiresSetup) {
		res.render("setup.ejs");
	} else {
		res.render("index.ejs");
	}
};

module.exports.info = {
	route: "/",
};
