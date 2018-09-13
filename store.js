import { observable, action } from 'mobx'

let store = null

class Store {

  @observable token = ''
  @observable user = {}
  @observable loggedIn = false

  @action.bound
    resetUser() {
      this.user = null
      this.loggedIn = false
      this.token = null
    }
    setUser(newUser) {
      this.user = newUser
    }
    setToken(newToken) {
      this.token = newToken
    }
}

export function initializeStore (isServer) {
  if (isServer) {
    return new Store(isServer)
  } else {
    if (store === null) {
      store = new Store(isServer)
    }
    return store
  }
}
