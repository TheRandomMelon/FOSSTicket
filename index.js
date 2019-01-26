const config = global.config = require("./config.js");

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
