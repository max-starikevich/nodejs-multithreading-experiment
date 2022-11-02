import express from 'express'

const app = express()
const port = 8080

app.get('/health', (_req, res) => {
  res.send({ status: 'OK', timestamp: new Date() })
})

app.listen(port, () => {
  console.log(`🚀 Health example started at http://localhost:${port}. PID: ${process.pid}`)
})
