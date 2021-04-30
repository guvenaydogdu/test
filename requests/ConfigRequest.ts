import { IConfigPager, IConfigsResponse, IConfigResponse, ISetConfig } from '../interfaces/Config'

import { BaseRequest } from './BaseRequest'

class ConfigRequest extends BaseRequest {
  prefix = '/Config'

  async getList(parameters: IConfigPager): Promise<IConfigsResponse> {
    const res = await this.axiosInstance.post<IConfigsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }

  async setConfig(parameters: ISetConfig): Promise<IConfigResponse> {
    const res = await this.axiosInstance.post<IConfigResponse>(
      this.prefix + '/SetConfig',
      parameters
    )
    return res.data
  }
  async getByName(name: string, langCode: string): Promise<IConfigResponse> {
    const res = await this.axiosInstance.get<IConfigResponse>(
      this.prefix + '/GetByName' + '?name=' + name + '&languageCode=' + langCode
    )
    return res.data
  }
}

export default ConfigRequest
