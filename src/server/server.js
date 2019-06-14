import moment from 'moment'

import config from './config'
import createServer from './core/express'
import winston from './core/logger'

const logger = createLogger('server', winston)
const server = createServer()

logger.info(`启动系统服务 ${moment().format('YYYY-MM-DD HH:ss:mm')}`)

server.listen(config.serverListenPort, () => {
  logger.success(`服务启动成功`)
  logger.info('-------------------------------------')
  logger.info('监听端口: ' + config.serverListenPort)
  logger.info('启动环境: ' + process.env.NODE_ENV)
  logger.info('-------------------------------------')
})