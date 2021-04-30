import { ICommon, IPagerInput, IResponse } from './Common'

interface ITransportOption extends ICommon {
  code: string
  name: string
  factor: number
}

type ITransportOptionPager = IPagerInput
type ITransportOptionsResponse = IResponse<ITransportOption[]>
export type { ITransportOption, ITransportOptionPager, ITransportOptionsResponse }
