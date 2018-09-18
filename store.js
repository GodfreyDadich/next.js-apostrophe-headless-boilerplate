import { observable, action } from 'mobx'
import {getCookieValue, getDecodedCookieValue} from './lib/utils/auth'

let store = null

class Store {

  @observable token = ''
  @observable user = {}
  @observable loggedIn = 'false'

  @action.bound
    resetUser() {
      this.user = {}
      this.loggedIn = 'false'
      this.token = ''
    }
    setUser(newUser) {
      this.user = newUser
    }
    setToken(newToken) {
      this.token = newToken
    }
}


export function initializeStore (isServer, initialState) {
  if (initialState && initialState.user) {
    store = new Store()
    store.loggedIn = initialState.loggedIn
    store.user = initialState.user
    store.token = initialState.token
  } else {
    store = new Store() 
    store.loggedIn = getCookieValue('loggedIn')
    if (store.loggedIn === 'true') {    
      store.user = getDecodedCookieValue('user')
      store.token = getDecodedCookieValue('token')
    }    
  }

  return store  
}
