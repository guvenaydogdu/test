import { IConfigGroupPager, IConfigGroupsResponse } from '../interfaces/ConfigGroup'

import { BaseRequest } from './BaseRequest'

class ConfigGroupRequest extends BaseRequest {
  prefix = '/ConfigGroup'

  async getList(parameters: IConfigGroupPager): Promise<IConfigGroupsResponse> {
    const res = await this.axiosInstance.post<IConfigGroupsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default ConfigGroupRequest
