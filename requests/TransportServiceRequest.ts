import { ITransportServicePager, ITransportServicesResponse } from '../interfaces/TransportService'
import { BaseRequest } from './BaseRequest'

class TransportServiceRequest extends BaseRequest {
  prefix = '/TransportService'

  async getList(parameters: ITransportServicePager): Promise<ITransportServicesResponse> {
    const res = await this.axiosInstance.post<ITransportServicesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default TransportServiceRequest
