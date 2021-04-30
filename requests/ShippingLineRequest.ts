import { IShippingLinePager, IShippingLinesResponse } from '../interfaces/ShippingLine'
import { BaseRequest } from './BaseRequest'

class ShippingLineRequest extends BaseRequest {
  prefix = '/ShippingLine'

  async getList(parameters: IShippingLinePager): Promise<IShippingLinesResponse> {
    const res = await this.axiosInstance.post<IShippingLinesResponse>(
      this.prefix + '/GetList',
      parameters
    )
    return res.data
  }
}

export default ShippingLineRequest
