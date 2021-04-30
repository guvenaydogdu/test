import { useRouter } from 'next/router'
import { useCallback } from 'react'
import cookie from 'js-cookie'

const useChangeLanguage = () => {
  const { push, query, locale: currentLocale, asPath } = useRouter()
  const changeLanguage = useCallback(
    (locale: string, options?: { cookie?: boolean }) => {
      const { cookie: saveCookie = true } = options || {}
      if (currentLocale !== locale) {
        push(asPath, undefined, { locale })
      }
      if (saveCookie) {
        cookie.set('NEXT_LOCALE', locale, { expires: 365 })
      }
    },
    [query, currentLocale]
  )

  return { changeLanguage }
}

export default useChangeLanguage
