import path from 'node:path'

import express, { RequestHandler } from 'express'
import piscina from 'piscina'

const app = express()
const port = 8080

const pool = new piscina.Piscina({
  filename: path.resolve(__dirname, 'fibonacci.js')
})

app.get('/fibonacci/:number', (async (req, res) => {
  const input = req.params.number

  if (typeof input !== 'string' || isNaN(parseInt(input))) {
    res.statusCode = 400
    res.send('Wrong argument')
    return
  }

  const num = parseInt(input)
  const result = await pool.run(num)

  res.send(JSON.stringify({ result }))
}) as RequestHandler)

app.get('/health', (_req, res) => {
  res.send({ status: 'OK', timestamp: new Date() })
})

app.listen(port, () => {
  console.log(`🚀 Pool example started at http://localhost:${port}. PID: ${process.pid}`)
})
