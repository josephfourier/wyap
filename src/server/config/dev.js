import path from 'path'

export default {
  app: {
  },
  serverListenPort: process.env.SERVER_PORT || 3000,
  apiListenPort: process.env.API_PORT || 4000,
  db: {
    uri: ''
  },
  logging: {
    file: {
      enabled: true,
      path: path.join(global.rootPath, 'logs'),
      level: 'info'
    }
  }
}