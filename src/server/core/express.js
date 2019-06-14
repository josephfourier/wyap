import express from 'express'
import http from 'http'

export default () => {
  const app = express()
  const server = http.createServer(app)
  return server
}
