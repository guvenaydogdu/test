import { IConfigOptionsResponse } from '../interfaces/ConfigOption'
import { BaseRequest } from './BaseRequest'

class ConfigOptionsRequest extends BaseRequest {
  prefix = '/ConfigOption'

  async getListByConfigId(id: number): Promise<IConfigOptionsResponse> {
    const res = await this.axiosInstance.get<IConfigOptionsResponse>(
      this.prefix + '/GetListByConfigId' + '?id=' + id
    )
    return res.data
  }
}

export default ConfigOptionsRequest
