import { ICity, ICountry } from './City'
import { ICommon, IResponse } from './Common'
import { IUser } from './User'

interface IUserCompany extends ICommon {
  code: string
  user: IUser
  userId: number
  companyName: string
  accountType: string
  country: ICountry
  countryId: number
  city: ICity
  cityId: number
  address: string
  postalCode: string
  taxNo: string
  taxAdministration: string
  website: string
  about: string
}

interface IUpdateUserCompany {
  id: number
  userId: number
  companyName: string
  companyPhone: string
  accountType: string
  countryId: number
  cityId: number
  address: string
  postalCode: string
  taxNo: string
  taxAdministration: string
  website: string
  about: string
}

type IUserCompanyResponse = IResponse<IUserCompany>

export type { IUserCompanyResponse, IUpdateUserCompany }
