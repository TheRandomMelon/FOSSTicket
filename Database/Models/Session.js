module.exports = global.Session = sequelize.define("session", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	user_id: Sequelize.INTEGER,
	token: Sequelize.STRING,
	timecreated: Sequelize.BIGINT,
	expirytime: Sequelize.BIGINT,
}, {
	timestamps: false,
});
