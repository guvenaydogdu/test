import { IResponse } from './Common'
import { IUser } from './User'

interface IAuth {
  token?: string
  expireDate: string
}

interface ILogin {
  email: string
  password: string
}

interface IResetPass {
  email: string
} // request parametre tipi

interface IResetNewPass {
  activationCode: any
  password: string
  passwordAgain: string
}

interface IRegister {
  id?: number
  integrationId?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  //companyPhone: string
  companyTaxOffice: string
  companyTaxNumber: string
  password: string
  passwordAgain: string
  countryId: number
  cityId: number
  companyCountryId: number
  companyCityId: number
}

type IAuthResponse = IResponse<IAuth>
type IRegisterResponse = IResponse<IUser>

export type {
  IAuth,
  ILogin,
  IAuthResponse,
  IRegister,
  IRegisterResponse,
  IResetPass,
  IResetNewPass,
}
