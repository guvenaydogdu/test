import { ICommon, IPagerInput, IResponse } from './Common'

interface IIncoterm extends ICommon {
  code: string
  name: string
}

type IIncotermPager = IPagerInput

type IIncotermResponse = IResponse<IIncoterm>
type IIncotermsResponse = IResponse<IIncoterm[]>

export type { IIncoterm, IIncotermPager, IIncotermResponse, IIncotermsResponse }
