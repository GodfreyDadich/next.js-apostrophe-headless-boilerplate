import fetch from 'isomorphic-fetch'
import env from './env'
import { computed, get, has, set } from 'mobx'
import jwt from 'jwt-simple'
import Cookie from 'js-cookie'

const {API_DOMAIN} = env
const secret = 'XXX'

export const aposLogIn = (formData) => {
  const logInAPI = `${API_DOMAIN}api/v1/login`
  const params = new URLSearchParams()
  params.append('username', formData.user)
  params.append('password', formData.pw)
  return fetch(logInAPI, {method: 'POST', body: params})
    .then(res => res.json())
    .then(json => {
      // set cookie
      Cookie.set('user', jwt.encode(json.user, secret), { expires: 14 })
      Cookie.set('loggedIn', true, { expires: 14 })
      Cookie.set('token', jwt.encode(JSON.stringify(json.bearer), secret), { expires: 14 })
      console.log(json)
      return json
    })
}

export const checkAuth = () => {
  const loggedIn = Cookie.get('loggedIn')
  console.log(loggedIn)
  // const loggedIn = process.browser ? getStatusFromLocalCookie() : getStatusFromServerCookie(ctx.req)
  return loggedIn === 'true'
}

export const aposLogOut = (token) => {
  const logInAPI = `${API_DOMAIN}api/v1/logout`
  const params = new URLSearchParams()
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  return fetch(logInAPI, {method: 'POST', headers: headers, body: params})
    .then(res => res.json())
    .then(json => {
      Cookie.remove('user')
      Cookie.remove('loggedIn')
      Cookie.remove('token')
    })
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwt.decode(jwt)
}

export const getUserFromLocalCookie = () => {
  return Cookie.getJSON('user')
}

export const getDecodedCookieValue = cookieName => {
  const todecode = Cookie.get(cookieName)
  const decoded = jwt.decode(todecode, secret)
  return decoded
}

export const getCookieValue = cookieName => Cookie.get(cookieName)
