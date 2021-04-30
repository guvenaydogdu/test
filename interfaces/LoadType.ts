import { ICommon, IPagerInput, IResponse } from './Common'

interface ILoadType extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type ILoadTypePager = IPagerInput

type ILoadTypeResponse = IResponse<ILoadType>
type ILoadTypesResponse = IResponse<ILoadType[]>

export type { ILoadType, ILoadTypePager, ILoadTypeResponse, ILoadTypesResponse }
