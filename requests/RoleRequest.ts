import { IRolePager, IRolesResponse } from '../interfaces/Role'

import { BaseRequest } from './BaseRequest'

class RoleRequest extends BaseRequest {
  prefix = '/Role'

  async getList(paramaters: IRolePager): Promise<IRolesResponse> {
    const res = await this.axiosInstance.post<IRolesResponse>(this.prefix + '/GetList', paramaters)
    return res.data as IRolesResponse
  }
}

export default RoleRequest
