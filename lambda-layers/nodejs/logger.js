const winston = require('winston')

const { printf } = winston.format

const logFormat = printf(({ level, message }) => {
  return `${level.toUpperCase()} ${message}`
})

exports.logger = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.Console()]
})