import isDev from 'isdev'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'mobx-react'
import { dehydrate } from '~/src/state/hydrate'
import { fetchData } from '~/src/utils/fetch'
import { Dir } from '~/src/config'
import routes from '~/src/routes'
import initStore from '~/stores'

function handleRouter (req, res, props) {
  const index = path.join(Dir.src, 'index')
  const { components, params, location } = props

  /*
    Initialize the store injecting the needed
    Initial State to pass on the client-side
  */
  const store = initStore({
    app: { ssrLocation: req.url },
  })

  /*
    Fetch data from the Components
  */
  fetchData(store, components, params, location.query)
    /*
      Pass the store to the mobx-react Provider
    */
    .then(() => renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    ))
    /*
      Render the html with dehydrate store
    */
    .then((html) => res
      .status(200)
      .render(index, {
        title: 'Title',
        build: isDev ? null : '/build',
        root: html,
        state: dehydrate(store),
      }))
}

function handleRedirect (res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search)
}

function handleNotFound (res) {
  res.status(404).send('Not Found')
}

function handleError (res, err) {
  res.status(500).send(err.message)
}

export function isoMiddleware (req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err)
      else if (redirect) handleRedirect(res, redirect)
      else if (props) handleRouter(req, res, props)
      else handleNotFound(res)
    })
}
