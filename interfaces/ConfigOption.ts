import { ICommon, IResponse } from './Common'
import { IConfig } from './Config'

interface IConfigOption extends ICommon {
  config?: IConfig
  configId: number
  name?: string
}

type IConfigOptionsResponse = IResponse<IConfigOption[]>

export type { IConfigOption, IConfigOptionsResponse }
