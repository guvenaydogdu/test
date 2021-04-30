import { ITransportOptionPager, ITransportOptionsResponse } from '../interfaces/TransportOption'
import { BaseRequest } from './BaseRequest'

class TransportOptionRequest extends BaseRequest {
  prefix = '/TransportOption'

  async getList(parameters: ITransportOptionPager): Promise<ITransportOptionsResponse> {
    const res = await this.axiosInstance.post<ITransportOptionsResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default TransportOptionRequest
