export default {
  hashSecret: '{{hashSecret}}',
  sessionSecret: '{{sessionSecret}}',
  app: {},
  db: {
    options: {
      user: process.env.MONGO_USER || '',
      pass: process.env.MONGO_PASS || '',
      useNewUrlParser: true
    }
  },
  redis: {
    enabled: false
  },
  mailer: {},
  logging: {
    console: {

    },
    file: {
      enabled: true
    }
  }
}