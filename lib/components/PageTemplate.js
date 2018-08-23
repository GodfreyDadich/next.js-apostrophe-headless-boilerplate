import React from 'react'
import Styles from './Styles'
import Header from './Header'
import Footer from './Footer'
// import { initGA, logPageView } from '../utils/analytics'

// This component simply wraps the pages that use this as a template
export default class PageTemplate extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  // componentDidMount () {
  // Initialize any site-wide front-end js here

  // if (!window.GA_INITIALIZED) {
  //   initGA()
  //   window.GA_INITIALIZED = true
  // }
  // logPageView()
  // }
  // componentWillUnmount () {
  // garbage collect here
  // }

  render () {
    return (
      <div className={`page-container ${this.props.classNames}`} ref='pageContainer'>
        <Styles />
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
