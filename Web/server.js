const { readdir } = require("fs-nextra");
const app = require("express")();
const server = global.server = require("http").createServer(app);
const ejs = require("ejs");
const upload = require("multer")();
const bcrypt = require("bcrypt");
const reload = require("require-reload")(require);

server.listen(config.server.port || 80, config.server.ip || "0.0.0.0", () => {
	winston.info(`[Web Server] Successfully opened on port ${config.server.port || 80}! Enjoy FOSSTicket!`);
	if (config.requiresSetup) {
		winston.warn(`[Configuration] requiresSetup is set to true. If you have already created an admin account, please set this value to false and restart FOSSTicket.`);
	}
});

module.exports = async() => {
	app.use(require("express").static(`${__dirname}/Views/Static/`));
	app.use(require("body-parser").json());
	app.use(require("body-parser").urlencoded({ extended: true }));
	app.use(require("compression")());
	app.engine("ejs", ejs.renderFile);
	app.set("view engine", "ejs");
	app.set("views", `${__dirname}/Views/Pages`);

	app.use(require("serve-favicon")(`${__dirname}/Views/Static/favicon.ico`));

	let getroutes = await readdir("./Web/Routes/GET");
	for (let i of getroutes) {
		let route = require(`./Routes/GET/${i}`);
		let name = route.info.route;
		app.get(name, (req, res) => reload(`./Routes/GET/${i}`)(req, res));
	}

	let postroutes = await readdir("./Web/Routes/POST");
	for (let i of postroutes) {
		let route = require(`./Routes/POST/${i}`);
		let name = route.info.route;
		app.post(name, (req, res) => reload(`./Routes/POST/${i}`)(req, res));
	}

	app.use(async(req, res, next) => res.status(404).render("404.ejs"));
};
