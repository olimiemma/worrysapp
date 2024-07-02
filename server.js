const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serverless = require('serverless-http')

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true)
  handle(req, res, parsedUrl)
})

module.exports.handler = serverless(server)

// For local development
if (!process.env.LAMBDA_TASK_ROOT) {
  app.prepare().then(() => {
    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
}