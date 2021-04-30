import { ICommon, IPagerInput, IResponse } from './Common'

interface ITransportService extends ICommon {
  code: string
  nameTR: string
  nameEN: string
  iconPath: string
}

interface ITransportServicePager extends IPagerInput {
  isVisible?: boolean
}

type ITransportServicesResponse = IResponse<ITransportService[]>
export type { ITransportService, ITransportServicePager, ITransportServicesResponse }
