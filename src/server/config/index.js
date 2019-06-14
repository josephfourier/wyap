import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import figures from 'figures'
import _ from 'lodash'

const createLogger = (function() {
  return function (prefix) {
    let logger = {}
    ;[
      'warning', 
      'info', 
      'tick', 
      'cross'
    ].forEach(key => {
      const colorMap = {
        warning: 'yellow',
        info: 'cyan',
        tick: 'green',
        cross: 'red'
      }
      
      logger[key] = function (msg) {
        return console.log.apply(
          console, 
          [chalk[colorMap[key]].bold(`[${prefix.toUpperCase()}] ${figures[key]} ${msg}`)]
        )
      }
    })
    logger.success = logger.tick
    logger.error = logger.cross
    return logger
  }
})()


global.rootPath = path.normalize(path.join(__dirname, '..', '..', '..'))
global.createLogger = createLogger

const extConfig = path.join(global.rootPath, 'config.js')
// 读取系统配置文件

const debug = createLogger('config')

debug.info('项目根目录：' + global.rootPath)

try {
  if (!fs.existsSync(extConfig)) {
    debug.warning('系统配置文件不存在，即将创建默认配置文件')
    debug.info('读取模板配置文件')
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const template = fs.readFileSync(path.join(__dirname, 'temp.js'))
    const compiled = _.template(template)
    const hashChanges = {
      hashSecret: 123
    }
    fs.writeFileSync(extConfig, compiled(hashChanges))
    debug.success('配置文件已创建')
  }
} catch (e) {

}