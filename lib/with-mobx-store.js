import React from 'react'
import {initializeStore} from '../store'
import {getValueFromServerCookie} from './utils/auth'

const isServer = typeof window === 'undefined'
const getOrCreateStore = initialState => 
  typeof initialState === 'object' ? 
    initializeStore(initialState) : initializeStore()

export default (App) => {
  return class AppWithMobx extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const initialState = appContext.ctx.req ? {
        user: getValueFromServerCookie(appContext.ctx.req, 'user', true),
        loggedIn: getValueFromServerCookie(appContext.ctx.req, 'loggedIn'),
        token: getValueFromServerCookie(appContext.ctx.req, 'token', true)
      } : {}
      const mobxStore = getOrCreateStore(initialState)

      // Provide the store to getInitialProps of pages
      appContext.ctx.mobxStore = mobxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext)
      }

      return {
        ...appProps,
        initialMobxState: mobxStore
      }
    }

    constructor (props) {
      super(props)
      this.mobxStore = getOrCreateStore(props.initialMobxState)
    }

    render () {
      return <App {...this.props} mobxStore={this.mobxStore} />
    }
  }
}
