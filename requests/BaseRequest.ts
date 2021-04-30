import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import Cookies from 'js-cookie'
import { parseCookies } from '../helpers'
import https from 'https'
const httpsAgent = new https.Agent({ rejectUnauthorized: false })
export const GLInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {},
  httpsAgent,
})
/*
function setAuthorizationHeader (authorization:string):void{
  GLInstance.defaults.headers["Authorization"] = `Bearer ${authorization}`
}
function setAuthorizationHeaderNull ():void{
  GLInstance.defaults.headers["Authorization"] = `Bearer`
}
export {setAuthorizationHeader,setAuthorizationHeaderNull}
*/
export class BaseRequest {
  axiosInstance: AxiosInstance = GLInstance
  constructor(serverSideContext: GetServerSidePropsContext | null = null) {
    this.axiosInstance.interceptors.request.use(
      requestInterceptorsSucces(serverSideContext),
      requestInterceptorsError()
    )
    this.axiosInstance.interceptors.response.use(
      responseInterceptorsSucces()
      //responseInterceptorsError(serverSideContext)
    )
  }
}

const requestInterceptorsSucces = (serverSideContext: GetServerSidePropsContext | null = null) => {
  return (config: AxiosRequestConfig) => {
    if (process.browser) {
      config.headers['Authorization'] = 'Bearer ' + Cookies.get('token')
    } else {
      const cookies = serverSideContext?.req.headers.cookie || null
      let parsedCookies
      if (cookies && typeof cookies == 'string') {
        parsedCookies = parseCookies(cookies)
      }
      config.headers['Authorization'] = 'Bearer ' + parsedCookies?.token
    }
    return config
  }
}
const requestInterceptorsError = () => {
  return (error: any) => {
    return Promise.reject(error)
  }
}

const responseInterceptorsSucces = () => {
  return (response: AxiosResponse) => {
    return response
  }
}
/*
const responseInterceptorsError = (serverSideContext: GetServerSidePropsContext | null = null) => {
  console.log('---', serverSideContext)
  return (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
}
*/
