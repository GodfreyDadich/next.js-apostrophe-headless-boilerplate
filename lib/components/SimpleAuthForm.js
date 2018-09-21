import {Row, Column} from './Grid'
import {aposLogIn, aposLogOut} from '../utils/auth'
import { inject, observer } from 'mobx-react'

const loadingString = 'loading...'

@inject('store') @observer
class SimpleAuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formUN: '',
      formPW: ''
    };

    this.handleUNChange = this.handleUNChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  handlePWChange(e) {
    this.setState({formPW: e.target.value})
  }
  handleUNChange(e) {
    this.setState({formUN: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    this.logIn()
  }

  async logIn() {
    // pending view state set here
    const logInRequest = await aposLogIn({user: 'john-doe', pw: 'test-password'}, this.props.store)
    console.log(typeof logInRequest)
    if(logInRequest.hasOwnProperty('error')){
      // handle FE error
      console.log(logInRequest.error)
    }
    // resolve pending state
  }

  async logOut() {
    // pending view state set here
    const logOutRequest = await aposLogOut(this.props.store.token, this.props.store)
    // pending vew state resolved here
  }
 
  render() {
    return (
      <Row>
        <Column columns='4' skip='4'>
        <h1>Basic Auth Form</h1>
          <form id='basic_auth' onSubmit={this.handleSubmit}>
            {(this.props.store.loggedIn !== 'true') ?
              <div>
                Username: <input type='text' id='user_name' value={this.state.formUN} onChange={this.handleUNChange}/>
                Password: <input type='password' id='password' value={this.state.formPW} onChange={this.handlePWChange} /> 
                <input type='submit' value='Log In' /> 
              </div> :
              <div>
                <h4>Hi {this.props.store.user && this.props.store.user.firstName}!</h4>
                <button onClick={this.logOut} disabled={(this.props.store.loggedIn === loadingString)}>Log Out</button>
              </div>
            }

          </form>
        </Column>
      </Row>
    )
  }
}

export default SimpleAuthForm
