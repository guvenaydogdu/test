import {
  ITransportType,
  IUpdateTransportType,
  ITransportTypePager,
  ITransportTypesResponse,
} from '../interfaces/TransportTypes'
import { BaseRequest } from './BaseRequest'

class TransportTypesRequest extends BaseRequest {
  prefix = '/TransportType'

  async getList(parameters: ITransportTypePager): Promise<ITransportTypesResponse> {
    const res = await this.axiosInstance.post<ITransportTypesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
  async update(parameters: IUpdateTransportType): Promise<ITransportType> {
    const res = await this.axiosInstance.post<ITransportType>(
      this.prefix + '/UpdateIsActive',
      parameters
    )
    return res.data
  }
}

export default TransportTypesRequest
