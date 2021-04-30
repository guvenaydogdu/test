import { GetServerSidePropsContext } from 'next'
import { parseCookies } from '../helpers'

type IFunc = (serverSideContext: GetServerSidePropsContext) => { props: any }

export const ProtectedPage = (func: IFunc) => {
  return async (serverSideContext: GetServerSidePropsContext) => {
    const cookies = serverSideContext?.req.headers.cookie || null
    let parsedCookies

    if (cookies && typeof cookies == 'string') {
      parsedCookies = parseCookies(cookies)
    }
    //Girmemesi gereken yerler aşağı eklenmeli
    if (parseCookies == undefined || parsedCookies?.token == undefined) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return func(serverSideContext)
  }
}

export const AdminProtectedPage = (func: IFunc) => {
  return async (serverSideContext: GetServerSidePropsContext) => {
    const cookies = serverSideContext?.req.headers.cookie || null
    let parsedCookies

    if (cookies && typeof cookies == 'string') {
      parsedCookies = parseCookies(cookies)
    }

    if (parseCookies == undefined || parsedCookies?.token == undefined) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    /* const request = Requsts()

    const data = await request.UserRequest.verifyAdminRole(1002)
    console.log(data)
*/

    return func(serverSideContext)
  }
}
