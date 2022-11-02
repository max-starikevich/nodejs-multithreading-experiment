import cluster from 'node:cluster'
import os from 'node:os'

import express from 'express'

import fibonacci from './fibonacci'

const cpuCount = os.cpus().length

if (cluster.isPrimary) {
  Array.from({ length: cpuCount }).map(() => cluster.fork())
} else {
  const app = express()
  const port = 8080

  app.get('/fibonacci/:number', (req, res) => {
    const input = req.params.number

    if (typeof input !== 'string' || isNaN(parseInt(input))) {
      res.statusCode = 400
      res.send('Wrong argument')
      return
    }

    const num = parseInt(input)

    res.send(JSON.stringify({ result: fibonacci(num) }))
  })

  app.get('/health', (_req, res) => {
    res.send({ status: 'OK', timestamp: new Date() })
  })

  app.listen(port, () => {
    console.log(`🚀 Cluster example started at http://localhost:${port}. PID: ${process.pid}`)
  })
}
