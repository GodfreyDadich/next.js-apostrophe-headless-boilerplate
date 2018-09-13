// import Router from 'next/router'

import Styles from '../components/Styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/newAuth'


export default Page => class DefaultPage extends React.Component {
  static getInitialProps (ctx) {
    const loggedUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req)
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)
    return {
      ...pageProps,
      loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser
    }
  }

  // logout = (eve) => {
  //   if (eve.key === 'logout') {
  //     Router.push(`/?logout=${eve.newValue}`)
  //   }
  // }

  // componentDidMount () {
  //   window.addEventListener('storage', this.logout, false)
  // }

  // componentWillUnmount () {
  //   window.removeEventListener('storage', this.logout, false)
  // }

  render () {
    return (
      <div>
        <Styles />
        <Header {...this.props} />
        <Page {...this.props} />
        <Footer {...this.props} />
      </div>
    )
  }
}
