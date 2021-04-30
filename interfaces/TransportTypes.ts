import { IPagerInput, IResponse } from './Common'
import { ICommon } from './Common'

interface ITransportType extends ICommon {
  name: string
  code: string
  phoneCode?: string
  iconPath: string
}

interface IUpdateTransportType {
  id: number
  isActive: boolean
}

type ITransportTypePager = IPagerInput
type ITransportTypeResponse = IResponse<ITransportType>
type ITransportTypesResponse = IResponse<ITransportType[]>

export type {
  ITransportType,
  IUpdateTransportType,
  ITransportTypePager,
  ITransportTypeResponse,
  ITransportTypesResponse,
}
