import { ICommon, IPagerInput, IResponse } from './Common'

interface ICarriageType extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type ICarriageTypePager = IPagerInput

type ICarriageTypeResponse = IResponse<ICarriageType>
type ICarriageTypesResponse = IResponse<ICarriageType[]>

export type { ICarriageType, ICarriageTypePager, ICarriageTypeResponse, ICarriageTypesResponse }
