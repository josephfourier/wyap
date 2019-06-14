import './config'
import createServer from './core/express'
const logger = createLogger('server')
const server = createServer()

server.listen(9000, () => {
  logger.success('listening')
})