import { observable } from 'mobx'

let store = null

class Store {
  @observable navData
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
