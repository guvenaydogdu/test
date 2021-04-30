import { ICity, ICountry } from './City'
import { ICommon, IPagerInput, IResponse } from './Common'

interface IUser extends ICommon {
  firstName?: string
  lastName?: string
  email?: string
  companyName?: string
  password?: string
  phone?: string
  companyPhone?: string
  countryId: number
  cityId: number
  fullName: string
  city?: ICity
  country?: ICountry
  roles?: IRole[]
  guarantorRequested: boolean
  department?: string
  jobTitle?: string
}
interface IUserPager extends IPagerInput {
  countryId: number
  cityId: number
}

interface IUserCreate {
  id: number
  integrationId?: string
  firstName?: string
  lastName?: string
  email?: string
  companyName?: string
  password?: string
  countryId: number
  cityId?: number
  phone?: string
  department: string
  jobTitle: string
}

interface IRole extends ICommon {
  name?: string
}

interface IUpdateGuarantor {
  userId: number
  guarantorRequested: boolean
}
interface IUserChangePassword {
  id: number
  currentPassword: string
  newPassword: string
  newPasswordAgain: string
}
interface IAdminUserCreate {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordAgain: string
  companyPhone: string
  countryId: number
  cityId: number
  roles: number[]
}

type IUserResponse = IResponse<IUser>
type IUsersResponse = IResponse<IUser[]>

export type {
  IUser,
  IUserPager,
  IUserCreate,
  IUserResponse,
  IUsersResponse,
  IUpdateGuarantor,
  IUserChangePassword,
  IAdminUserCreate,
}
