import {Row, Column} from './Grid'
import {aposLogIn, aposLogOut, checkAuth, getDecodedCookieValue, getCookieValue} from '../utils/auth'
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
  componentDidMount() {
    if (checkAuth()) {
      this.props.store.user = getDecodedCookieValue('user')
      this.props.store.loggedIn = getCookieValue('loggedIn')
      this.props.store.token = getDecodedCookieValue('token')
    }    
  }
  logIn() {
    this.props.store.loggedIn = loadingString
    if (checkAuth()) {
      this.props.store.user = getDecodedCookieValue('user')
      this.props.store.loggedIn = getCookieValue('loggedIn')
      this.props.store.token = getDecodedCookieValue('token')
    } else {
      aposLogIn({user: 'john-doe', pw: 'test-password'})
        .then(res => {
        this.props.store.token = res.bearer
        this.props.store.user = res.user
        this.props.store.loggedIn = true
      })
    }
  }

  logOut() {
    aposLogOut(this.token).then(res => {
      this.props.store.resetUser()
    })
  }
 
  render() {
    return (
      <Row>
        <Column columns='4' skip='4'>
        <h1>Basic Auth Form</h1> {(this.props.store.loggedIn.toString() !== 'true').toString()}
          <form id='basic_auth' onSubmit={this.handleSubmit}>
            {(this.props.store.loggedIn.toString() !== 'true') ?
              <div>
                Username: <input type='text' id='user_name' value={this.state.formUN} onChange={this.handleUNChange}/>
                Password: <input type='password' id='password' value={this.state.formPW} onChange={this.handlePWChange} /> 
                <input type='submit' value='Log In' /> 
              </div> :
              <div>
                <h4>Hi {this.props.store.user.firstName}!</h4>
                <button onClick={() => this.logOut()} disabled={(this.props.store.loggedIn === loadingString)}>Log Out</button>
              </div>
            }

          </form>
        </Column>
      </Row>
    )
  }
}

export default SimpleAuthForm
