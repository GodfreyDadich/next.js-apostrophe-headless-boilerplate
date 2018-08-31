import { observable } from 'mobx'

let store = null

class Store {
  @observable navItems = [
    {
      'title': 'About',
      'slug': '/about',
      '_id': 'cjk02thnh001lvfaw6xqs9heh',
      '_url': '/about',
      '_children': []
    }
  ]

  constructor (isServer) {
    // this.lastUpdate = lastUpdate
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
