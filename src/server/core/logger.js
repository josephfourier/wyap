import winston from 'winston'
import config from '../config'

const transports = []
if (config.logging.console.enabled) {
  transports.push(new winston.transports.Console({
    level: config.logging.console.level,
  }))
}

if (config.logging.file.enabled) {
  const logDir = config.logging.file.path
  transports.push(new winston.transports.File({
    dirname: logDir,
    level: config.logging.file.level || 'info',
    filename: config.logging.file.filename || 'server.log'
  }))
}

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: false
})

export default logger
