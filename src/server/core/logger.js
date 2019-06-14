import winston from 'winston'

const transports = []

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: false
})

export default logger
