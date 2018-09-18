import { inject } from 'mobx-react'
import Link from 'next/link'

const subNav = (subItems) => subItems.length > 0 ? (
  <ul className='subNav'>
    {subItems.map(subItem => navItemMarkup(subItem))}
  </ul>) : null

const navItemMarkup = navItem =>
  <li key={`item-${navItem._id}`}>
    <Link href={navItem._url} prefetch><a>{navItem.title}</a></Link>
    {subNav(navItem._children)}
  </li>

const menuItems = NAV_DATA => NAV_DATA.map(item => navItemMarkup(item))

@inject('staticStore')
class DynamicNav extends React.Component {
  render () {
    const { staticStore } = this.props
    return (
      <ul>
        {menuItems(staticStore.navData)}
        <style jsx>{`
          
          //styles go here
        `}</style>
      </ul>
    )
  }
}

export default DynamicNav
