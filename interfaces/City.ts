import { IPagerInput, ICommon, IResponse } from './Common'
interface ICountry extends ICommon {
  name: string
  code: string
  phoneCode?: string | null
  iconPath?: string | null
  xCoordinate: number
  yCoordinate: number
}

interface ICity extends ICommon {
  country?: ICountry
  countryId: number
  name: string
  xCoordinate: number
  yCoordinate: number
}

interface ICityPagerInput extends IPagerInput {
  includeCountry: boolean
  countryId: number
}

type ICountryPagerInput = IPagerInput
type ICityResponse = IResponse<ICity>
type ICitiesResponse = IResponse<ICity[]>

type ICountryResponse = IResponse<ICountry>
type ICountriesResponse = IResponse<ICountry[]>

export type {
  ICountry,
  ICity,
  ICityPagerInput,
  ICityResponse,
  ICitiesResponse,
  ICountryResponse,
  ICountriesResponse,
  ICountryPagerInput,
}
