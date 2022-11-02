import crypto from 'node:crypto'
import express from 'express'

const app = express()
const port = 8080

app.get('/crypto', (_req, res) => {
  res.send(crypto.randomBytes(64).toString('hex'))
})

app.get('/health', (_req, res) => {
  res.send({ status: 'OK', timestamp: new Date() })
})

app.listen(port, () => {
  console.log(`🚀 Crypto example started at http://localhost:${port}. PID: ${process.pid}`)
})
