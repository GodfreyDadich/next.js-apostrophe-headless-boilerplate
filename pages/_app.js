import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import { Provider } from 'mobx-react'
import fetch from 'isomorphic-fetch'
import env from '../lib/utils/env'

const { APP_DOMAIN, APP_DOMAIN_DEV, NODE_ENV } = env
const requestDomain = (NODE_ENV === 'production') ? APP_DOMAIN : APP_DOMAIN_DEV
let staticStore = {}

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const env = process.browser ? 'client' : 'server'
    console.log(`Executing MyApp getInitialProps (${env} side)`, { staticStore })

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    /* This request 👇 is optional and can be removed if the nav data from Apostrophe isn't used in this application */
    if (typeof staticStore.navData === 'undefined') {
      const toFetch = `${requestDomain}api/micro/nav`
      console.log(toFetch)
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
