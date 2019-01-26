const config = global.config = require("./config.js");
const makeToken = global.makeToken = charNumber => {
	let text = "";
	let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=/[]{}";

	for (let i = 0; i < charNumber; i++) { text += chars.charAt(Math.floor(Math.random() * chars.length)); }

	return text;
};
const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const winston = global.winston = createLogger({
	transports: [
		new transports.Console({
			colorize: true,
		}),
		new DailyRotateFile({
			filename: "./Logs/Winston-Log-%DATE%.log",
			datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxFiles: "14d",
			maxSize: "20m",
		}),
	],
	exitOnError: false,
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.printf(info => `${info.level}: ${info.message} [${info.timestamp}]`)
	),
});

require("./Database/init.js")();
require("./Web/server.js")();
