import { NAV_DATA } from '../utils/constants'
import { inject, observer } from 'mobx-react'

const subNav = (subItems) => subItems.length > 0 ? (
  <ul className='subNav'>
    {subItems.map(subItem => navItemMarkup(subItem))}
  </ul>) : null

const navItemMarkup = navItem =>
  <li key={`item-${navItem._id}`}>
    <a href={navItem._url} target='_blank'>{navItem.title}</a>
    {subNav(navItem._children)}
  </li>

const menuItems = NAV_DATA.map(item => navItemMarkup(item))

@inject('store') @observer
class Navigation extends React.Component {

  render () {
    return (
      <ul>
        {menuItems}

        {this.props.store.navItems.length}

        <style jsx>{`
          
          //styles go here
        `}</style>
      </ul>
    )
  }
}

export default Navigation
