import { ICommon, IPagerInput, IResponse } from './Common'

type IRefusalReasonPager = IPagerInput

interface IRefusalReason extends ICommon {
  code: string
  nameTR: string
  nameEN: string
}

type IRefusalReasonResponse = IResponse<IRefusalReason>
type IRefusalReasonsResponse = IResponse<IRefusalReason[]>

export type { IRefusalReasonResponse, IRefusalReasonsResponse, IRefusalReasonPager }
