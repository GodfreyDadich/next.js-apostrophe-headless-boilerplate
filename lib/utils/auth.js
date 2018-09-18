import fetch from 'isomorphic-fetch'
import env from './env'
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
      Cookie.set('loggedIn', 'true', { expires: 14 })
      Cookie.set('token', jwt.encode(json.bearer, secret), { expires: 14 })
      console.log(json)
      return json
    })
    .catch(error => {
      console.log(error)
      aposLogOut()
    })    
}

export const checkAuth = () => {
  const loggedIn = getCookieValue('loggedIn')
  return (loggedIn === 'true')
}

export const aposLogOut = (token) => {
  const logInAPI = `${API_DOMAIN}api/v1/logout`
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  return fetch(logInAPI, {method: 'POST', headers: headers})
    .then(res => {
      Cookie.remove('user')
      Cookie.remove('loggedIn')
      Cookie.remove('token')
    })
    .catch(error => {
      console.log(error)
    })
}

export const getEncodedValueFromServerCookie = (req, cookieName) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieName}=`))
  if (!jwtCookie) {
    return undefined
  }
  return jwt.decode(jwtCookie.split('=')[1], secret)
}

export const getValueFromServerCookie = (req, cookieName) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieName}=`))
  if (!jwtCookie) {
    return undefined
  }
  return jwtCookie.split('=')[1]
}

export const getDecodedCookieValue = cookieName => {
  const todecode = Cookie.get(cookieName)
  return todecode ? jwt.decode(todecode, secret) : null
}

export const getCookieValue = cookieName => Cookie.get(cookieName)
