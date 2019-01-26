module.exports = global.User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	username: Sequelize.STRING,
	fullname: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING,
	agent: Sequelize.INTEGER,
	pfp: Sequelize.STRING,
}, {
	timestamps: false,
});
