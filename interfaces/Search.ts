import { ICommon, IResponse } from './Common'
import { ICurrencyType } from './CurrencyType'
import { ILocation } from './Location'
import { IShippingLine } from './ShippingLine'
import { ITransportOption } from './TransportOption'
import { ITransportService } from './TransportService'
import { ITranportTypeContainer } from './TransportTypeContainer'

interface ISearch {
  locationId: number
  locationTypeId?: number
  town?: string | null
  port?: string | null
  city?: string | null
  countryLocationId?: number | null
  country?: string | null
  xCoordinate?: number
  yCoordinate?: number
  locationTypeName?: string
}

interface INewSearch {
  transportTypeId: number
  pageSize: number
  searchText: string
}

interface ITransportSearch extends ICommon {
  shippingLine?: IShippingLine
  shippingLineId: number
  shippingLineIntegrationId?: string

  transportTypeContainer: ITranportTypeContainer
  transportTypeContainerId: number
  transportTypeContainerIntegrationId?: string

  transportOption: ITransportOption
  transportOptionId: number
  transportOptionIntegrationId?: string

  transportService: ITransportService
  transportServiceId: number
  transportServiceIntegrationId?: string
  transportServices: ITransportSearch[]
  originLocation: ILocation
  originLocationId: number
  originLocationIntegrationId?: string

  destinationLocation: ILocation
  destinationLocationId: number
  destinationLocationIntegrationId?: string

  currencyType: ICurrencyType
  currencyTypeId: number
  currencyTypeIntegrationId?: string

  startDate: string
  endDate: string
  transferringPort1?: string

  transferringPort2?: string

  allIn: boolean
  day: number
  price: number
  totalPrice: number
  km: number
  isLocal: boolean

  transportOptions: ITransportOption[]
}

type IAutoCompleteSearchResponse = IResponse<ISearch[]>
type ITransportSearchResponse = IResponse<ITransportSearch[]>

export type {
  ISearch,
  IAutoCompleteSearchResponse,
  INewSearch,
  ITransportSearch,
  ITransportSearchResponse,
}
