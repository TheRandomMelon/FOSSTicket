const { mysql } = require("../config.js");
const { readdir } = require("fs-nextra");
const Sequelize = global.Sequelize = require("sequelize");

const sequelize = global.sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
	host: mysql.host,
	dialect: "mysql",
	operatorsAliases: Sequelize.Op,
	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = async() => {
	sequelize.authenticate()
		.then(() => winston.info("[Database] Successfully connected."))
		.catch(err => winston.error("[Database] Failed to connect: ", err.stack));
	let schemas = await readdir("./Database/Models");
	for (let s of schemas) require(`./Models/${s}`);
	return sequelize;
};
