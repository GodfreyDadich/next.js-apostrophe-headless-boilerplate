const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'
const { parse } = require('url')
const { join } = require('path')
const app = next({ dev })
const mobxReact = require('mobx-react')
const handle = app.getRequestHandler()
const compression = require('compression')
const fetch = require('isomorphic-fetch')

const rootStaticFiles = [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico'
]

mobxReact.useStaticRendering(true)

app.prepare().then(() => {
  const server = express()
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    server.use(compression())
  }

  /* add microservice url mappings here */
  const navAPIPath = `api/v1/apostrophe-pages?all=true&hideOrphans=true`
  server.get('/api/micro/nav', (req, res) => handleAPIProxy(req, res, navAPIPath)) /* Returns a JSON page tree of all pages that aren't "hidden from navigation" */

  /* add url Front-End mappings here */
  server.get('/with-data/:slug', (req, res) => {
    return app.render(req, res, '/sample-with-data', Object.assign({slug: req.params.slug}, req.query))
  })

  server.get('/', (req, res) => {
    return app.render(req, res, '/sample-page')
  })

  server.get('/*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const filePath = (process.env.NODE_ENV === 'production') ? '../static/prod' : '../static'

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

function handleAPIProxy (req, res, apiPath) {
  const navDataAPI = `${process.env.API_DOMAIN}${apiPath}&apiKey=${process.env.API_KEY}`
  fetch(navDataAPI)
    .then(response => response.json())
    .then(json => {
      res.setHeader('Content-Type', 'application/json')
      res.send(json)
    })
}
