import { ILoadTypePager, ILoadTypesResponse } from '../interfaces/LoadType'
import { BaseRequest } from './BaseRequest'

class LoadTypeRequest extends BaseRequest {
  prefix = '/LoadType'

  async getList(parameters: ILoadTypePager): Promise<ILoadTypesResponse> {
    const res = await this.axiosInstance.post<ILoadTypesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default LoadTypeRequest
