import fetch from 'isomorphic-fetch'
import {setCookieValue, removeCookies} from './cookie'
import { API_DOMAIN } from 'babel-dotenv'

export const aposLogIn = async (formData, store) => {
  const logInAPI = `${API_DOMAIN}api/v1/login`
  const params = new URLSearchParams()
  params.append('username', formData.user)
  params.append('password', formData.pw)
  
  try {
    const logInReq = await fetch(logInAPI, {method: 'POST', body: params})
    const json = await logInReq.json()
    setCookieValue('user', json.user, true)
    setCookieValue('loggedIn', 'true')
    setCookieValue('token', json.bearer, true)
    store.setUser(json)

    return json
  } catch(e) {
    console.error(e)
    aposLogOut(store.token, store)
    return e
  } 
}

export const  aposLogOut = async (token, store) => {
  const logOutAPI = `${API_DOMAIN}api/v1/logout`
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  removeCookies([
    'user',
    'loggedIn',
    'token'
  ])
  store.resetUser()  
  try {
    return await fetch(logOutAPI, {method: 'POST', headers: headers})
  } catch (e) {
    console.error(e)
    return e
  }
}
