import fetch from 'isomorphic-fetch'
import jwt from 'jwt-simple'
import Cookie from 'js-cookie'
import { JWT_SECRET, API_DOMAIN } from 'babel-dotenv'

export const aposLogIn = async (formData, store) => {
  const logInAPI = `${API_DOMAIN}api/v1/login`
  const params = new URLSearchParams()
  params.append('username', formData.user)
  params.append('password', formData.pw)
  
  try {
    const logInReq = await fetch(logInAPI, {method: 'POST', body: params})
    const json = await logInReq.json()
    Cookie.set('user', jwt.encode(json.user, JWT_SECRET), { expires: 14 })
    Cookie.set('loggedIn', 'true', { expires: 14 })
    Cookie.set('token', jwt.encode(json.bearer, JWT_SECRET), { expires: 14 })
    store.setUser(json)
    return json
  } catch(e) {
    console.error(e)
    aposLogOut(store.token, store)
    return false
  } 
}

export const  aposLogOut = async (token, store) => {
  Cookie.remove('user')
  Cookie.remove('loggedIn')
  Cookie.remove('token')
  store.resetUser()

  const logOutAPI = `${API_DOMAIN}api/v1/logout`
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  try {
    return await fetch(logOutAPI, {method: 'POST', headers: headers})
  } catch (e) {
    console.eor(e)
    return false
  }
}

export const getValueFromServerCookie = (req, cookieName, decode = false) => {
  if (typeof req.headers.cookie === 'undefined') {
    return undefined
  } else {
    const ckie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieName}=`))
    if (!ckie) {
      return undefined
    } else {
      return decode ? jwt.decode(ckie.split('=')[1], JWT_SECRET) : ckie.split('=')[1]
    }
  }
}

export const getCookieValue = (cookieName, decode = false) => {
  const ckie = Cookie.get(cookieName)
  if(!ckie) {
    return undefined
  } else {
    return decode ? jwt.decode(todecode, JWT_SECRET) : ckie
  }
}
