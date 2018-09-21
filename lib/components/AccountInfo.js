import { inject, observer } from 'mobx-react'

@inject('store') @observer
class AccountInfo extends React.Component {

  render() {
    return (
      <div>
        Logged In: {this.props.store.loggedIn} &nbsp;
        User Name: {!!this.props.store.user && this.props.store.user.hasOwnProperty('firstName') ? this.props.store.user.firstName : ''}
      </div>
    )
  }

}

export default AccountInfo