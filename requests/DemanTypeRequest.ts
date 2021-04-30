import { IDemandTypePager, IDemandTypesResponse } from '../interfaces/DemandType'
import { BaseRequest } from './BaseRequest'

class DemanTypeRequest extends BaseRequest {
  prefix = '/DemandType'

  async getList(parameters: IDemandTypePager): Promise<IDemandTypesResponse> {
    const res = await this.axiosInstance.post<IDemandTypesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default DemanTypeRequest
