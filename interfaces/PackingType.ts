import { ICommon, IPagerInput, IResponse } from './Common'

interface IPackingType extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type IPackingTypePager = IPagerInput

type IPackingTypeResponse = IResponse<IPackingType>
type IPackingTypesResponse = IResponse<IPackingType[]>

export type { IPackingType, IPackingTypePager, IPackingTypeResponse, IPackingTypesResponse }
