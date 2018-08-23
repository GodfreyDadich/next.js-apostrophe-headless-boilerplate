import ReactGA from 'react-ga'
const GATrackingID = 'UA-000000-01' // Replace with real tracking ID

export const initGA = () => {
  ReactGA.initialize(GATrackingID)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
