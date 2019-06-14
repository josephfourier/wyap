import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import figures from 'figures'
import _ from 'lodash'

const createLogger = (function() {
  return function (prefix, winston) {
    let logger = {}
    ;[
      'warn', 
      'info', 
      'success', 
      'error'
    ].forEach(key => {
      const colorMap = {
        warn: 'yellow',
        info: 'cyan',
        success: 'green',
        error: 'red'
      }
      
      logger[key] = function (msg) {
        if (winston) {
          try {
            // 写入文件
            winston[key](msg)
          } catch (e) {}
        }

        let figureKey = key
        if (key === 'warn') figureKey = 'warning'
        if (key === 'success') figureKey = 'tick'
        if (key === 'error') figureKey = 'cross'

        if (typeof msg === 'object') {
          msg = JSON.stringify(msg)
        }
        return console.log.apply(
          console, 
          [chalk[colorMap[key]].bold(`[${prefix.toUpperCase()}] ${figures[figureKey]} ${msg}`)]
        )
      }
    })

    return logger
  }
})()


global.rootPath = path.normalize(path.join(__dirname, '..', '..', '..'))
global.createLogger = createLogger

const extConfig = path.join(global.rootPath, 'config.js')
// 读取系统配置文件

const logger = createLogger('config')

logger.info('项目根目录 ' + global.rootPath)

let externalConfig
try {
  if (!fs.existsSync(extConfig)) {
    logger.warn('系统配置文件不存在，将会创建配置文件')
    logger.info('读取模板配置文件')
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const template = fs.readFileSync(path.join(__dirname, 'temp.js'))
    const compiled = _.template(template)
    const TokenGenerate = require('tokgen')
    const tokgen = new TokenGenerate()
    const hashChanges = {
      hashSecret: tokgen.generate(),
      sessionSecret: tokgen.generate()
    }
    fs.writeFileSync(extConfig, compiled(hashChanges))
    logger.success('配置文件已创建')
  }

  externalConfig = require(path.join(global.rootPath, 'config.js')).default
} catch (e) {
  logger.error('------------------------------------')
  logger.error('无法创建配置文件')
  logger.error(e)
  logger.error('------------------------------------')
}
const baseConfig = {
  isDevMode: process.env.NODE_ENV === 'development',
  isProdMode: process.env.NODE_ENV === 'production',
  isTestMode: process.env.NODE_ENV === 'test'
}

const envConfig = baseConfig.isDevMode 
  ? require('./dev').default 
  : require('./prod').default

export default _.defaultsDeep(externalConfig, baseConfig, envConfig)