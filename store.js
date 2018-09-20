import { observable, action } from 'mobx'
import {getCookieValue} from './lib/utils/auth'

let store = null

class Store {

  @observable token = ''
  @observable user = {}
  @observable loggedIn = 'false'
  @observable initialized = false

  @action.bound
    resetUser() {
      this.user = {}
      this.loggedIn = 'false'
      this.token = ''
    }
    setUser(json) {
      this.user = json.user
      this.loggedIn = 'true'
      this.token = json.token
    }
    setToken(newToken) {
      this.token = newToken
    }
}


export function initializeStore (initialState) {
  store = new Store()
  if(!store.initialized){
    if (initialState && initialState.user) {
      store.loggedIn = initialState.loggedIn
      store.user = initialState.user
      store.token = initialState.token
    } else {
      store.loggedIn = getCookieValue('loggedIn') || 'false'
      store.user = getCookieValue('user', true) || {}
      store.token = getCookieValue('token', true) || ''
    }
    store.initialized = true
  }

  return store  
}
