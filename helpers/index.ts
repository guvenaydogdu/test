import Cookie from 'cookie'
export function parseCookies(cookie: string) {
  return Cookie.parse(cookie)
}
