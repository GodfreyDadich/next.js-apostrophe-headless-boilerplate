import { inject, observer } from 'mobx-react'

@inject('store') @observer
class AccountInfo extends React.Component {

  render() {
    return (
      <div>
        Logged In: {this.props.store.loggedIn.toString()} &nbsp;
        User Name: {this.props.store.user.firstName}
      </div>
    )
  }

}

export default AccountInfo