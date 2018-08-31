import AppStore from '../stores/app'

/**
  Inject Inital State into Stores
 */
export default (state) => ({
  app: new AppStore(state.app)
})
