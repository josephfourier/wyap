if (process.env.NODE_ENV === 'production') {

} else {
  require('babel-register')
  require('../src/server/server')
}