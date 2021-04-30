import axios from 'axios'
import React, { useContext, createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

interface IAuthProvidersProps {
  children: any
  pasedCookies: any
}
interface IUser {
  email?: string
  userId?: number
  roles?: string[]
  fullName?: string
}

export const AUTH_ACTION_TYPE = {
  SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
  HIDE_LOGIN_MODAL: 'HIDE_LOGIN_MODAL',
}

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  user: IUser | null
  login: (token: string) => void
  logout: () => void
  isLoginModalOpen: boolean
  //dispatch: React.Dispatch<any>
  changeLoginModalStatus: () => void
}

export const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  login: () => {
    console.log()
  },
  logout: () => {
    console.log()
  },
  //isLoginModalOpen: false,
  //dispatch: () => null,
  isLoginModalOpen: false,
  changeLoginModalStatus: () => {
    console.log()
  },
}
const AuthContext = createContext<AuthContextType>(initialState)

export const getUserInfoFromJwt = (token: string) => {
  const decoded: any = jwt_decode(token)
  const fullName = JSON.parse(decoded?.UserInfo)?.FirsName
    ? JSON.parse(decoded?.UserInfo)?.FirsName
    : '' + JSON.parse(decoded?.UserInfo)?.LastName
    ? JSON.parse(decoded?.UserInfo)?.LastName
    : ''
  return {
    email: decoded?.email,
    userId: decoded?.userId,
    roles: JSON.parse(decoded?.roles),
    fullName,
  }
}

export function AuthProvider({ children, pasedCookies }: IAuthProvidersProps) {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(
    pasedCookies?.token ? pasedCookies?.token : null
  )
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const changeLoginModalStatus = () => {
    setIsLoginModalOpen((prev) => !prev)
  }
  const login = async (token: string) => {
    try {
      await axios.post('/api/login', { token })
      setToken(token)
    } catch (err: any) {
      setToken(null)
    }
  }
  const logout = async () => {
    try {
      await axios.post('/api/logout')
      router.push('/')
    } catch (err: any) {
      console.log(err)
    }

    setToken(null)
  }

  //const [state, dispatch] = useReducer(reducer, reducerInitialState)
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: token ? true : false,
        user: token ? getUserInfoFromJwt(token) : null,
        login,
        logout,
        changeLoginModalStatus,
        isLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom React hook to access the context
export const useAuth = () => {
  return useContext(AuthContext)
}
/*

function reducer(state: any, action: any) {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SHOW_LOGIN_MODAL:
      state.isLoginModalOpen = true
      return { ...state }
    case AUTH_ACTION_TYPE.HIDE_LOGIN_MODAL:
      state.isLoginModalOpen = false
      return { ...state }
    default:
      return state
  }
}
*/
