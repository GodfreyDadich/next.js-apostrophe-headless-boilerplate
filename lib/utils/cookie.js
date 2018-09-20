import jwt from 'jwt-simple'
import Cookie from 'js-cookie'
import { JWT_SECRET } from 'babel-dotenv'

export const setCookieValue = (cookieName, cookieVal, encode = false) => {
  const cookieValue = encode ? jwt.encode(cookieVal, JWT_SECRET) : cookieVal
  Cookie.set(cookieName, cookieValue, { expires: 14 })
}

export const removeCookies = cookiesToRemove => {
  cookiesToRemove.forEach( cookieToRemove => {
    Cookie.remove(cookieToRemove)
  })
}

export const getCookieValueFromServer = (req, cookieName, decode = false) => {
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
