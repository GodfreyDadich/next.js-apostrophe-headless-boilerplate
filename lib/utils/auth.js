import fetch from 'isomorphic-fetch'
import env from './env'
import jwt from 'jwt-simple'
import Cookie from 'js-cookie'
import { JWT_SECRET } from "babel-dotenv"

const {API_DOMAIN, API_KEY} = env

export const aposLogIn = (formData, store) => {
  const logInAPI = `${API_DOMAIN}api/v1/login`
  const params = new URLSearchParams()
  params.append('username', formData.user)
  params.append('password', formData.pw)
  return fetch(logInAPI, {method: 'POST', body: params})
    .then(res => res.json())
    .then(json => {
      // set cookie
      Cookie.set('user', jwt.encode(json.user, JWT_SECRET), { expires: 14 })
      Cookie.set('loggedIn', 'true', { expires: 14 })
      Cookie.set('token', jwt.encode(json.bearer, JWT_SECRET), { expires: 14 })

      store.setUser(json)
      
      return json
    })
    .catch(error => {
      console.log(error)
      aposLogOut(store.token, JWT_SECRET)
    })    
}

export const checkAuth = () => {
  const loggedIn = getCookieValue('loggedIn')
  return (loggedIn === 'true')
}

export const aposLogOut = (token, store) => {
  Cookie.remove('user')
  Cookie.remove('loggedIn')
  Cookie.remove('token')
  store.resetUser()

  const logOutAPI = `${API_DOMAIN}api/v1/logout`
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  return fetch(logOutAPI, {method: 'POST', headers: headers})
    .then(res => {
      // console.log('logged out on server')
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
  return jwt.decode(jwtCookie.split('=')[1], JWT_SECRET)
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
  return todecode ? jwt.decode(todecode, JWT_SECRET) : null
}

export const getCookieValue = cookieName => Cookie.get(cookieName)
