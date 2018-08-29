import { NAV_DATA } from '../utils/constants'

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

const Navigation = () =>
  <ul>
    {menuItems}

    <style jsx>{`
      
      //styles go here
    `}</style>
  </ul>

export default Navigation
