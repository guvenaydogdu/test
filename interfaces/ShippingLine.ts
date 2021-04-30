import { ICommon, IPagerInput, IResponse } from './Common'

interface IShippingLine extends ICommon {
  name: string
  code: string
  shippingLineTransportTypes?: any[]
}

type IShippingLinePager = IPagerInput
type IShippingLinesResponse = IResponse<IShippingLine[]>
export type { IShippingLine, IShippingLinePager, IShippingLinesResponse }
