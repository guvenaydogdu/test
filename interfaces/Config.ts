import { ICommon, IPagerInput, IResponse } from './Common'

export enum ConfigInputType {
  None = 0,
  Number = 1,
  Checkbox = 2,
  Text = 3,
  Dropdown = 4,
}

interface IConfig extends ICommon {
  name?: string
  description?: string
  valueType: ConfigInputType
  value: string
}

interface ISetConfig {
  id: number
  value: string
  languageCode: string
  configGroupId: number
}
type IConfigsResponse = IResponse<IConfig[]>
type IConfigResponse = IResponse<IConfig>

interface IConfigPager extends IPagerInput {
  languageCode: string
  configGroupId: number
}

export type { IConfig, IConfigResponse, IConfigsResponse, IConfigPager, ISetConfig }
