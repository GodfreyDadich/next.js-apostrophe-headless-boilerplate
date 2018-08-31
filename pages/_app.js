import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import { Provider } from 'mobx-react'
import { fetchDataOnLocationMatch } from '../lib/utils/fetch'
import { rehydrate } from '../state/hydrate' // working backwards from step 7

const store = rehydrate()
fetchDataOnLocationMatch(browserHistory, routes, match, store)

class MyApp extends App {
  render () {
    const {Component, pageProps, mobxStore} = this.props
    return (
      <Container>
        <Provider store={mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)
