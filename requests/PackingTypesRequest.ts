import { IPackingTypePager, IPackingTypesResponse } from '../interfaces/PackingType'
import { BaseRequest } from './BaseRequest'

class PackingTypesRequest extends BaseRequest {
  prefix = '/PackingType'

  async getList(parameters: IPackingTypePager): Promise<IPackingTypesResponse> {
    const res = await this.axiosInstance.post<IPackingTypesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default PackingTypesRequest
