import { IOrderTransportPager, IOrderTransportsResponse } from '../interfaces/Order'
import { BaseRequest } from './BaseRequest'

class OrderTransportRequest extends BaseRequest {
  prefix = '/OrderTransport'

  async getList(data: IOrderTransportPager): Promise<IOrderTransportsResponse> {
    const res = await this.axiosInstance.post<IOrderTransportsResponse>(
      this.prefix + '/GetList',
      data
    )
    return res.data
  }
}

export default OrderTransportRequest
