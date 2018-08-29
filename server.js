const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
const { parse } = require('url')
const { join } = require('path')
const app = next({ dev })
const handle = app.getRequestHandler()
const compression = require('compression')

const rootStaticFiles = [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico'
]

app.prepare().then(() => {
  const server = express()
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    server.use(compression())
  }

  /* add url mappings here */
  server.get('/with-data/:slug', (req, res) => {
    return app.render(req, res, '/sample-with-data', Object.assign({slug: req.params.slug}, req.query))
  })

  server.get('/', (req, res) => {
    return app.render(req, res, '/sample-page')
  })

  server.get('/*', (req, res) => {
    const parsedUrl = parse(req.url, true)

    const filePath = false ? 'static/prod' : 'static' /* detect env here */
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, filePath, parsedUrl.pathname)
      app.serveStatic(req, res, path)
    } else {
      return handle(req, res)
    }
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Read on http://localhost:${port}`)
  })
})
