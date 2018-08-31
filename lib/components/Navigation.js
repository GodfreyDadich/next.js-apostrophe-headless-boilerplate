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

const menuItems = NAV_DATA => NAV_DATA.map(item => navItemMarkup(item))

@inject('store') @observer
class Navigation extends React.Component {
  
  componentWillMount() {
    if( this.props.store.navItems.length < 2 ) {
      console.log('nav will mount')
      this.props.store.navItems.push(
        {
          'title': 'Case Studies',
          'slug': '/case-studies',
          '_id': 'cjk02u4bx0021vfawen18mgs9',
          '_url': '/case-studies',
          '_children': [
            {
              'title': 'Case Study Example',
              'slug': '/case-studies/case-study-example',
              '_id': 'cjjekyx7r000xpzawtwxzfo8h',
              '_url': '/case-studies/case-study-example',
              '_children': []
            }
          ]
        }
      )
    }
  }
  render () {
    return (
      <ul>
        {menuItems(this.props.store.navItems)}
        {this.props.store.navItems.length}
        <style jsx>{`
          
          //styles go here
        `}</style>
      </ul>
    )
  }
}

export default Navigation
