import { ICommon, IPagerInput, IResponse } from './Common'

interface IImoClass extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type IImoClassPager = IPagerInput

type IImoClassResponse = IResponse<IImoClass>
type IImoClassesResponse = IResponse<IImoClass[]>

export type { IImoClass, IImoClassPager, IImoClassResponse, IImoClassesResponse }
