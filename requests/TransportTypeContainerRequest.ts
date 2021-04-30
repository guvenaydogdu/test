import {
  ITranportTypeContainersResponse,
  ITransportTypeContainerPagerInput,
} from '../interfaces/TransportTypeContainer'
import { BaseRequest } from './BaseRequest'

class TransportTypeContainerRequest extends BaseRequest {
  prefix = '/TransportTypeContainer'

  async getList(
    parameters: ITransportTypeContainerPagerInput
  ): Promise<ITranportTypeContainersResponse> {
    const res = await this.axiosInstance.post<ITranportTypeContainersResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default TransportTypeContainerRequest
