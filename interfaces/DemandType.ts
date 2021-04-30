import { ICommon, IPagerInput, IResponse } from './Common'

interface IDemandType extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type IDemandTypePager = IPagerInput

type IDemandTypeResponse = IResponse<IDemandType>
type IDemandTypesResponse = IResponse<IDemandType[]>

export type { IDemandType, IDemandTypePager, IDemandTypeResponse, IDemandTypesResponse }
