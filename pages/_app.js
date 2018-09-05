import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import { Provider } from 'mobx-react'
import fetch from 'isomorphic-fetch'

let staticStore = {}

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const env = process.browser ? 'client' : 'server'
    console.log(`Executing MyApp getInitialProps (${env} side)`, { staticStore })

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // move fetch out of file
    if (typeof staticStore.navData === 'undefined') {
      console.log('fetching nav data')
      const toFetch = `http://localhost:3000/api/v1/apostrophe-pages?all=true&hideOrphans=true&apiKey=dc2c3c67-5e82-47a9-9829-d7ffd920050c` //getAPIUrl('sample')
      const response = await fetch(toFetch)
      const data = await response.json()
      staticStore = Object.assign(staticStore, {navData: data._children})
    } else {
      console.log(`nav data found: ${staticStore.navData}`)
    }

    return { pageProps, staticStore }
  }

  render () {
    const {Component, pageProps, staticStore} = this.props
    return (
      <Container>
        <Provider staticStore={staticStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)
