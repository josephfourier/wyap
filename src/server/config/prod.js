export default {
  app: {
  },
  serverListenPort: process.env.SERVER_PORT || 3000,
  apiListenPort: process.env.API_PORT || 4000,
  db: {
    uri: '',
    options: {
      user: process.env.MONGO_USER || '',
      pass: process.env.MONGO_PASS || '',
    }
  }
}