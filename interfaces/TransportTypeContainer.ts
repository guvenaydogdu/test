import { ICommon, IPagerInput, IResponse } from './Common'
import { ITransportType } from './TransportTypes'

interface ITranportTypeContainer extends ICommon {
  transportType?: ITransportType
  transportTypeId: number
  name: string
  iconPath: string
  code: string
}

interface ITransportTypeContainerPagerInput extends IPagerInput {
  transportTypeId: number
}

type ITranportTypeContainersResponse = IResponse<ITranportTypeContainer[]>

export type {
  ITranportTypeContainer,
  ITransportTypeContainerPagerInput,
  ITranportTypeContainersResponse,
}
