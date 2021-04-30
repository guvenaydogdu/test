import { ICarriageType } from './CarriageType'
import { ICategory } from './Category'
import { ICommon, IPagerInput, IResponse } from './Common'
import { IDemandType } from './DemandType'
import { IImoClass } from './ImoClass'
import { IIncoterm } from './Incoterm'
import { ILoadType } from './LoadType'
import { IAddDocument } from './OrderDocument'
import { IPackingType } from './PackingType'
import { IShippingLine } from './ShippingLine'
import { ITransportService } from './TransportService'
import { ITranportTypeContainer } from './TransportTypeContainer'
import { ITransportType } from './TransportTypes'
import { IUser } from './User'

interface IOrderCreate {
  integrationId?: number
  userId: number
  transportTypeId?: number
  shippingLineId?: number
  transportServiceId?: number
  originLocationId?: number
  destinationLocationId?: number
  originLocationName?: string
  destinationLocationName?: string
  orderTransports?: IOrderTransport[]
  validDate?: string
  duedate?: string
  categoryId?: number
  categoryName?: string
  productName?: string
  cost?: number
  needInsurance?: boolean
  needCustomsClearance?: boolean
  needAdditionalService?: boolean
  note?: string
  imo?: boolean
  unCode?: string
  imoClassId?: number
  width?: number
  size?: number
  height?: number
  transportOptionId?: number
  packingTypeId?: number
  loadTypeId?: number
  grossWeight?: number
  transportTypeContainerId?: number
  count?: number
  hoardable?: boolean
  floorCount?: number
  loadingSpeed?: number
  loweringSpeed?: number
  demandTypeId?: number
  capacity?: number
  name?: string
  surname?: string
  email?: string
  telephone?: string
  companyName?: string
  identificationNumber?: string
  storeHouse?: boolean
  hsCode?: string
  carriageTypeId?: number
  incotermId?: number
}

interface IOrderTransport {
  integrationId?: number
  orderId?: number
  transportId?: number
  transportOptionId?: number
  count?: number
  transportServiceId?: number
  transportService?: ITransportService
  originLocationId: number
  originLocationName?: number
  destinationLocationId?: number
  destinationLocationName?: number
  requestPrice?: number
  day?: number
  km?: number
  isLocal?: boolean
  shippingLineId?: number
}

interface IOrderPager extends IPagerInput {
  userId?: number
  shippingLineId?: number
  transportTypeContainerId?: number
  statusId?: OrderStatus
  orderId?: number
  includeCategory?: boolean
  includeImoClass?: boolean
  includeTransportTypeContainer?: boolean
  includePackingType?: boolean
  includeIncoterm?: boolean
}

interface IOrder extends ICommon {
  code?: string

  user?: IUser
  userId: number
  transportType?: ITransportType
  transportTypeId: number
  shippingLine?: IShippingLine
  shippingLineId: number

  originLocationId: number
  originLocationName: string

  destinationLocationId: number
  destinationLocationName: string

  categoryId: number

  category?: ICategory
  transportTypeContainerId: number

  transportTypeContainer?: ITranportTypeContainer
  imoClassId: number

  imoClass: IImoClass
  status: OrderStatus

  productName: string
  cost: number

  imo: boolean

  unCode: string

  requestTotalPrice: number

  responseTotalPrice: number

  date: string

  validDate: string

  duedate: string

  needCustomsClearance: boolean

  needInsurance: boolean

  hsCode?: string

  needAdditionalService: boolean

  grossWeight: number

  count: number

  note: string

  storeHouse: boolean

  width: number

  size: number

  height: number

  hoardable: boolean

  floorCount: number

  packingTypeId: number

  packingType?: IPackingType
  loadingSpeed: number

  loweringSpeed: number

  demandTypeId: number

  demandType?: IDemandType
  carriageTypeId: number

  carriageType?: ICarriageType
  capacity: number

  incotermId: number
  incoterm?: IIncoterm
  loadTypeId: number

  loadType?: ILoadType
  tradeType: any
  refusalReason?: any
  refusalReasonId: number

  refusalReasonDescription: string

  requestPriceForDifferentCompany: boolean

  billForDifferentCompany: boolean

  billForForeingCompany: boolean

  name: string

  surname: string

  identificationNumber: string

  companyName: string

  companyAddress: string

  country: string

  city: string

  town: string

  postalCode: string

  taxNumber: string

  taxAdministration: string
}

interface IOrderTransportPager extends IPagerInput {
  transportId: number
  orderId: number
  includeTransportService?: boolean
  includeTransportOption?: boolean
}

interface IApproveOrder {
  orderId: number
  requestPriceForDifferentCompany?: boolean
  billForDifferentCompany?: boolean
  billForForeingCompany?: boolean
  name?: string
  surname?: string
  identificationNumber?: string
  companyName?: string
  companyAddress?: string
  country?: string
  city?: string
  town?: string
  postalCode?: string
  taxNumber?: string
  taxAdministration?: string
  documents?: IAddDocument[]
}

interface IRejectOrder {
  orderId: number
  refusalReasonId: number
  refusalReasonName: string
  refusalReasonDescription: string
}

export enum OrderStatus {
  None = 0,
  Requested = 1,
  PendingApproval = 2,
  NegativeEvaluation = 3,
  Rejected = 4,
  PendingFinancialApproval = 5,
  NegativeFinancialEvaluation = 6,
  PendingPurchase = 7,
  PassedPaymentPeriod = 8,
  Purchased = 9,
  ActiveClientRejected = 10,
}

type IOrderResponse = IResponse<IOrder>
type IOrdersResponse = IResponse<IOrder[]>

type IOrderTransportResponse = IResponse<IOrderTransport>
type IOrderTransportsResponse = IResponse<IOrderTransport[]>

export type {
  IOrder,
  IOrderCreate,
  IOrderTransport,
  IOrderPager,
  IOrderResponse,
  IOrdersResponse,
  IOrderTransportResponse,
  IOrderTransportPager,
  IOrderTransportsResponse,
  IApproveOrder,
  IRejectOrder,
}
