
export function getCookie (name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = String(document.cookie).match(reg)
  if (arr) {
    return decodeURIComponent(arr[2])
  }
  return null
}

export function setCookie (name, value) {
  const days = 7
  const exp = new Date()
  exp.setTime(exp.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp.toGMTString()};domain=8pig.com;path=/`
}

export function removeCookie (name) {
  const date = new Date()
  date.setTime(date.getTime() - 10000)
  document.cookie = `${name}=v; expires=${date.toGMTString()}; path=/; domain=8pig.com`
}

export function clearCookie () {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`
    }
  }
}
