export default {
  hashSecret: 'EJloehbDa35LoUs8pajvJOdRqP9VLxq0',
  sessionSecret: 'TjI6e6bLRoiXoKmIBpa17nTbrixGm6SW',
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